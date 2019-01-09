import graphene
import traceback
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

        new_thread = ThreadModel(**cleaned_input)
        new_thread.save()
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

        "Checks if user entered a new name and if the entered name is already taken"
        if ThreadModel.objects.filter(name=filtered_input.get('new_name')).first():
            raise GraphQLError('The entered name already taken.')
        
        if filtered_input.get('name') and ' ' in filtered_input.get('new_name'):
            raise GraphQLError('The name of the thread should not contain any spaces.')

        for (key, value) in filtered_input.items():
            setattr(updated_thread, key, value)
        updated_thread.save()

        return UpdateThread(thread=updated_thread)


class JoinThread(graphene.Mutation):
    """
    Adds the calling user to the thread with the provided thread name
    """
    class Arguments:
        name = graphene.String(required=True, description="Name of the target thread")

    ' Fields '
    # thread = graphene.Field(ThreadNode)
    # user   = graphene.Field(UserNode)
    membership = graphene.Field(ThreadMemberNode)
    
    def mutate(self, info, name):
        thread = ThreadModel.objects.get(name=name)
        try:
            membership = ThreadMemberModel(user=info.context.user, thread=thread)
            membership.save()
        except Exception as e:
            raise GraphQLError(traceback.format_exc())
        return JoinThread(membership=membership)


# class LeaveThread(graphene.Mutation):
    # pass


# class SetAdmin(graphene.relay.ClientIDMutation):
    # """
    # Set the user with the provided username an 
    # admin of the thread.
    # """
    # class Input:
        # thread_name = graphene.String(required=True, description="The name of the thread")
        # username = graphene.String(required=True, description="User's username")

    # ' Fields '
    # thread = graphene.Field(ThreadNode)
    # user   = graphene.Field(UserNode)

    # def mutate(self, info, **input):
        # called_user = info.context.user
        # thread = ThreadModel.get(name=input.get('name'))
        
        # "Getting the membership of the calling user"
        # # membership

        # if called_user.is_anonymous:
            # raise GraphQLError('Not logged in.')
        # if not called_user.is_staff:  # TODO: add if admin of thread
            # raise GraphQLError('Not an admin')


class DeleteThread(graphene.Mutation):
    """
    Delete thread with provided unique name.
    Deletion of posts within thread is on CASCADE mode.
    """
    class Arguments:
        name = graphene.String(required=True, description="Name of the thread")

    ' Fields '
    thread = graphene.Field(ThreadNode)

    def mutate(self, info, username):
        # TODO: check if its an admin of the thread
        pass
