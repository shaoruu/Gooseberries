import graphene
from graphql import GraphQLError
from backend.utils import remove_none
from backend.threads.models import Thread as ThreadModel
from backend.threads.schemas.queries import ThreadNode


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

        if ' ' in input.get('name'):
            raise GraphQLError('The name of the thread should not contain any spaces.')

        "Checks if entered thread name already exists"
        if ThreadModel.objects.filter(name=input.get('name')).first():
            raise GraphQLError('Thread name already taken.')

        new_thread = ThreadModel(**input)
        new_thread.save()
        return CreateThread(thread=new_thread)


class UpdateThread(graphene.relay.ClientIDMutation):
    """
    Updates a thread with the optional arguments provided.
    """
    class Input:
        id          = graphene.ID(required=True, description="Thread id")
        name        = graphene.String(description="Updated thread name")
        description = graphene.String(description="Updated thread description")

    ' Fields '
    thread = graphene.Field(ThreadNode)

    def mutate_and_get_payload(root, info, **input):        
        called_user = info.context.user
        if called_user is None or called_user.is_anonymous:
            raise GraphQLError('Not logged in.')

        "Checks if the entered original thread name exists"
        if not ThreadModel.objects.filter(id=input.get('id')).first():
            raise GraphQLError('Thread not found.')

        "Checks if user entered a new name and if the entered name is already taken"
        if ThreadModel.objects.filter(name=input.get('name')).first():
            raise GraphQLError('The entered name already taken.')
        
        filtered_input = remove_none(input)

        if filtered_input.get('name') and ' ' in filtered_input.get('name'):
            raise GraphQLError('The name of the thread should not contain any spaces.')

        # used "pop" instead of "get" to get rid of the old_name argument
        updated_thread = ThreadModel.objects.filter(id=filtered_input.pop('id')).first()
        for (key, value) in filtered_input.items():
            setattr(updated_thread, key, value)
        updated_thread.save()

        return UpdateThread(thread=updated_thread)









