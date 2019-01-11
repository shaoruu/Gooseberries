import graphene
from graphql import GraphQLError
from backend.likes.models import Like as LikeModel
from backend.posts.models import Post as PostModel
from backend.comments.models import Comment as CommentModel
from backend.likes.schemas.queries import LikeNode


class LikePost(graphene.Mutation):
    """
    Adds a like to the specified post.
    """
    class Arguments:
        post_unique_identifier = graphene.String(required=True, description="Unique identifier of the post")

    ' Fields '
    like = graphene.Field(LikeNode)

    def mutate(self, info, post_unique_identifier):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        post = PostModel.objects.get(unique_identifier=post_unique_identifier)
        try:
            new_like = LikeModel(content_object=post, user=info.context.user)
        except Exception as e:
            raise GraphQLError(e)
        else:
            new_like.save()
        return LikePost(like=new_like)
