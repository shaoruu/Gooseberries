import graphene
from graphql import GraphQLError
from backend.utils import clean_input
from backend.posts.models import Post as PostModel
from backend.posts.schemas.queires import PostNode
from backend.users.models import User as UserModel
from backend.threads.models import Thread as ThreadModel, ThreadMember as ThreadMemberModel
from django.core.exceptions import ObjectDoesNotExist


class CreatePostOnThread(graphene.relay.ClientIDMutation):
    """
    Creates a post of the calling user,
    posting it onto the specified thread.
    """
    class Input:
        thread_name = graphene.String(required=True, description="Thread name")
        title       = graphene.String(required=True, description="Title of the post")
        content     = graphene.String(required=True, description="Content of the post")
        published   = graphene.Boolean(description="Whether the post is published or not")

    ' Fields '
    post = graphene.Field(PostNode)

    def mutate_and_get_payload(root, info, **input):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')

        # extracting out 'thread_name' for later object creation
        thread = ThreadModel.objects.get(name=input.pop('thread_name'))

        if not is_member(info.context.user, thread):
            raise GraphQLError('Not a member.')

        "Creating the post"
        cleaned_input = clean_input(input)
        cleaned_input = dict(cleaned_input, **{
            'user'  : info.context.user,
            'thread': thread
        })
        post = PostModel(**cleaned_input)
        post.save()

        return CreatePostOnThread(post=post)
        

class UpdatePostOnThread(graphene.relay.ClientIDMutation):
    """
    Fetches and changes the data of the specified post;
    returns the udpated post to user
    """
    class Input:
        post_unique_identifier = graphene.String(required=True, description="Unique ID of the thread")
        title = graphene.String(description="New title")
        content = graphene.String(description="New content")

    ' Fields '
    post = graphene.Field(PostNode)

    def mutate_and_get_payload(root, info, **input):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        updated_post = PostModel.objects.get(unique_identifier=input.pop('post_unique_identifier'))
        
        for (key, value) in clean_input(input).items():
            setattr(updated_post, key, value)
        updated_post.save()

        return UpdatePostOnThread(post=updated_post)


class DeletePostOnThread(graphene.Mutation):
    """
    Deletes the specified post on the thread. 
    """
    class Arguments:
        post_unique_identifier = graphene.String(required=True, description="The unique identifier of the post to delete")

    ' Fields '
    successful = graphene.Boolean()

    def mutate(root, info, post_unique_identifier):
        try:
            deleted_post = PostModel.objects.get(unique_identifier=post_unique_identifier)
        except Exception as e:
            raise GraphQLError(e)
        else: 
            deleted_post.delete()
        return DeletePostOnThread(successful=True)





def is_member(user, thread):
    try:
        ThreadMemberModel.objects.filter(
            user=user,
            thread=thread
        ).get()
    except ObjectDoesNotExist:
        # objects.filter throws DoesNotExist error
        return False
    else:
        # object exists
        return True
