import graphene
from django.db import IntegrityError
from graphql import GraphQLError
from backend.utils import clean_input 
from backend.threads.models import Thread as ThreadModel, ThreadMember as ThreadMemberModel
from backend.threads.schemas.queries import ThreadNode, ThreadMemberNode
from backend.users.models import User as UserModel
from backend.users.schemas.queries import UserNode


class CreateThread(graphene.relay.ClientIDMutation):
    """
    Creates a Thread object with the provided
    arguments and store it into database.
    """
    class Input: 
        name        = graphene.String(required=True, description="Thread name")
        description = graphene.String(required=True, description="Thread description")

    ' Fields '
    thread = graphene.Field(ThreadNode)

    def mutate_and_get_payload(root, info, **input):
        called_user = info.context.user
        if called_user is None or called_user.is_anonymous:
            raise GraphQLError('Not logged in.')

        cleaned_input = clean_input(input)

        if ' ' in cleaned_input.get('name'):
            raise GraphQLError('The name of the thread should not contain any spaces.')

        "Checks if entered thread name already exists"
        if ThreadModel.objects.filter(name=cleaned_input.get('name')).first():
            raise GraphQLError('Thread name already taken.')

        # Creating thread
        new_thread = ThreadModel(**cleaned_input)
        new_thread.save()

        # Adding creator to the thread
        new_membership = ThreadMemberModel(user=called_user, thread=new_thread)
        new_membership.save()

        return CreateThread(thread=new_thread)


class UpdateThread(graphene.relay.ClientIDMutation):
    """
    Updates a thread with the optional arguments provided.
    """
    class Input:
        name        = graphene.String(required=True, description="Thread name")
        new_name    = graphene.String(description="Updated thread name")
        description = graphene.String(description="Updated thread description")

    ' Fields '
    thread = graphene.Field(ThreadNode)

    def mutate_and_get_payload(root, info, **input):        
        called_user = info.context.user
        if called_user is None or called_user.is_anonymous:
            raise GraphQLError('Not logged in.')

        filtered_input = clean_input(input)

        # used "pop" instead of "get" to get rid of the old_name argument
        updated_thread = ThreadModel.objects.get(name=filtered_input.pop('name'))
        if not is_admin(called_user, updated_thread):
            raise GraphQLError('Not an admin.')

        "Checks if user entered a new name and if the entered name is already taken"
        if ThreadModel.objects.filter(name=filtered_input.get('new_name')).first():
            raise GraphQLError('The entered name already taken.')
        
        if filtered_input.get('new_name') and ' ' in filtered_input.get('new_name'):
            raise GraphQLError('The name of the thread should not contain any spaces.')

        # remove 'new_name' attribute and set to 'name' for spread operator
        if filtered_input.get('new_name'):
            filtered_input['name'] = filtered_input.pop('new_name')

        for (key, value) in filtered_input.items():
            setattr(updated_thread, key, value)
        updated_thread.save()

        return UpdateThread(thread=updated_thread)


class JoinThread(graphene.Mutation):
    """
    Adds the calling user to the thread with the provided thread name
    """
    class Arguments:
        thread_name = graphene.String(required=True, description="Name of the targeted thread")

    ' Fields '
    # thread = graphene.Field(ThreadNode)
    # user   = graphene.Field(UserNode)
    membership = graphene.Field(ThreadMemberNode)
    
    def mutate(self, info, thread_name):
        thread = ThreadModel.objects.get(name=thread_name)

        if ThreadMemberModel.objects.filter(user__username=info.context.user.username, thread__name=thread_name).first():
            raise GraphQLError('Already Joined')

        " No joining if thread is closed "
        if not thread.is_open:
            raise GraphQLError('Thread is closed.')
        try:
            membership = ThreadMemberModel(user=info.context.user, thread=thread)
        except Exception as e:
            raise GraphQLError(e)
        else:
            membership.save()
        return JoinThread(membership=membership)


class LeaveThread(graphene.Mutation):
    """
    Removes the user's membership for the thread.
    """
    class Arguments:
        thread_name = graphene.String(required=True, description="Name of the targeted thread")

    ' Fields '
    successful = graphene.Boolean()

    def mutate(self, info, thread_name):
        thread = ThreadModel.objects.get(name=thread_name)
        try:
            membership = ThreadMemberModel.objects.filter(
                user=info.context.user,
                thread=thread
            ).get()
        except Exception as e:
            raise GraphQLError(e)
        else:
            membership.delete()
        return LeaveThread(successful=True)


class Promote(graphene.relay.ClientIDMutation):
    """
    Set the user with the provided username an 
    admin of the thread.
    """
    class Input:
        thread_name = graphene.String(required=True, description="The name of the thread")
        username    = graphene.String(required=True, description="User's username")

    ' Fields '
    membership = graphene.Field(ThreadMemberNode)

    def mutate_and_get_payload(root, info, **input):
        # thread = ThreadModel.objects.get(name=input.get('thread_name'))
        # user   = UserModel.objects.get(username=input.get('username')) 

        "Getting the membership of the calling user"
        try:
            membership = ThreadMemberModel.objects.filter(
                user__username=clean_input(input).get('username'),
                thread__name=clean_input(input).get('thread_name')
            ).get()
        except Exception as e:
            raise GraphQLError(e)
        else:
            membership.is_admin = True
            membership.save()
        return Promote(membership=membership)


class Demote(graphene.relay.ClientIDMutation):
    """
    Remove the user with the provided username from the admin list
    """
    class Input:
        thread_name = graphene.String(required=True, description="The name of the thread")
        username    = graphene.String(required=True, description="User's username")
    
    ' Fields '
    membership = graphene.Field(ThreadMemberNode)

    def mutate_and_get_payload(root, info, **input):
        # thread = ThreadModel.objects.get(name=input.get('thread_name'))
        # user   = UserModel.objects.get(username=input.get('username')) 

        "Getting the membership of the calling user"
        try:
            membership = ThreadMemberModel.objects.filter(
                user__username=clean_input(input).get('username'),
                thread__name=clean_input(input).get('thread_name')
            ).get()
        except Exception as e:
            raise GraphQLError(e)
        else:
            membership.is_admin = False
            membership.save()
        return Demote(membership=membership)


class SetNickname(graphene.Mutation):
    """
    Sets user's uesrname to the given username within a thread
    """
    class Arguments:
        thread_name = graphene.String(required=True, description="Name of the thread")
        username    = graphene.String(required=True, description="User's username")
        nickname    = graphene.String(required=True, description="New nickname")

    ' Fields '
    membership = graphene.Field(ThreadMemberNode)

    def mutate(self, info, thread_name, username, nickname):
        try:
            membership = ThreadMemberModel.objects.filter(
                user__username__exact=username,
                thread__name__exact=thread_name
            ).get()
        except Exception as e:
            raise GraphQLError(e)
        else:
            membership.set_nickname(nickname)
            membership.save()
        return SetNickname(membership=membership)


class ToggleThreadMode(graphene.Mutation):
    """
    Toggles whether the thread is open or closed;
    switches True/False for is_open
    """
    class Arguments:
        thread_name = graphene.String(required=True, description="Name of the thread")

    ' Fields '
    thread = graphene.Field(ThreadNode)

    def mutate(self, info, thread_name):
        try:
            thread = ThreadModel.objects.get(name=thread_name)
            if not is_admin(info.context.user, thread):
                raise Exception("Not an admin.")
        except Exception as e:
            raise GraphQLError(e)
        else:
            thread.toggle_open()
            thread.save()
        return ToggleThreadMode(thread=thread)
            

class DeleteThread(graphene.Mutation):
    """
    Delete thread with provided unique name.
    Deletion of posts within thread is on CASCADE mode.
    """
    class Arguments:
        thread_name = graphene.String(required=True, description="Name of the thread")

    ' Fields '
    successful = graphene.Boolean()

    def mutate(self, info, thread_name):
        try: 
            thread = ThreadModel.objects.get(name=thread_name)
            if is_admin(info.context.user, thread):
                thread.delete()
            else:
                raise Exception('Not an admin');
        except Exception as e:
            raise GraphQLError(e)
        return DeleteThread(successful=True)


def is_admin(user, thread):
    membership = ThreadMemberModel.objects.filter(
        user=user, thread=thread
    ).get()
    return membership.is_admin
