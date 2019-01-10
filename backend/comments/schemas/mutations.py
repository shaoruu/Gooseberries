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
            new_comment = CommentModel(content_object=post, content=input.get('content'), user=info.context.user)
        except Exception as e:
            raise GraphQLError(e)
        else:
            new_comment.save()
        return CreateCommentOnPost(comment=new_comment)



