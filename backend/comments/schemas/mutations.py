import graphene
from graphql import GraphQLError
from backend.utils import clean_input
from backend.comments.models import Comment as CommentModel
from backend.posts.models import Post as PostModel
from backend.comments.schemas.queries import CommentNode


class CreateCommentOnPost(graphene.relay.ClientIDMutation):
    """
    Creates a comment under a certain post using the specified
    post unique identifier.
    """
    class Input:
        post_unique_identifier = graphene.String(required=True, description="Unique identifier of the post")
        content                = graphene.String(required=True, description="Content of the comment")
    
    ' Field '
    comment = graphene.Field(CommentNode)

    def mutate_and_get_payload(root, info, **input):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        post = PostModel.objects.get(unique_identifier=input.get('post_unique_identifier'))
        try:
            new_comment = CommentModel(content_object=post, content=clean_input(input).get('content'), user=info.context.user)
        except Exception as e:
            raise GraphQLError(e)
        else:
            new_comment.save()
        return CreateCommentOnPost(comment=new_comment)


class CreateCommentOnComment(graphene.relay.ClientIDMutation):
    """
    Creates a comment under a comment with the specified
    comment unique identifier.
    """
    class Input:
        comment_unique_identifier = graphene.String(required=True, description="Unique identifier of the comment")
        content                   = graphene.String(required=True, description="Content of the comment")

    ' Fields '
    comment = graphene.Field(CommentNode)

    def mutate_and_get_payload(root, info, **input):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        comment = CommentModel.objects.get(unique_identifier=input.get('comment_unique_identifier'))
        try:
            new_comment = CommentModel(content_object=comment, content=clean_input(input).get('content'), user=info.context.user)
        except Exception as e:
            raise GraphQLError(e)
        else:
            new_comment.save()
        return CreateCommentOnComment(comment=new_comment)


class UpdateComment(graphene.relay.ClientIDMutation):
    """
    Fetcehs and changes the comment data of the specified comment;
    returns the updated comment to user.
    """
    class Input:
        comment_unique_identifier = graphene.String(required=True, description="Unique identifier of the comment")
        content = graphene.String(required=True, description="New content")

    ' Fields '
    comment = graphene.Field(CommentNode)

    def mutate_and_get_payload(root, info, **input):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        updated_comment = CommentModel.objects.get(unique_identifier=input.get('comment_unique_identifier'))
        
        updated_comment.content = input.get('content')
        updated_comment.save()

        return UpdateComment(comment=updated_comment)


class DeleteComment(graphene.Mutation):
    """
    Delete comment with the provided unique identifier.
    """
    class Arguments:
        comment_unique_identifier = graphene.String(required=True, description="Unique identifier of the comment")

    ' Fields '
    successful = graphene.Boolean()

    def mutate(self, info, comment_unique_identifier):
        try:
            deleted_comment = CommentModel.objects.get(unique_identifier=comment_unique_identifier)
        except Exception as e:
            raise GraphQLError(e)
        else:
            deleted_comment.delete()
        return DeleteComment(successful=True)







