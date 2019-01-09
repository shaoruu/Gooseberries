import graphene
from graphql import GraphQLError
from backend.utils import clean_input 
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









