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


class LikeComment(graphene.Mutation):
    """
    Adds a like to the specified post.
    """
    class Arguments:
        comment_unique_identifier = graphene.String(required=True, description="Unique identifier of the comment")

    ' Fields '
    like = graphene.Field(LikeNode)

    def mutate(self, info, comment_unique_identifier):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        comment = CommentModel.objects.get(unique_identifier=comment_unique_identifier)
        try:
            new_like = LikeModel(content_object=comment, user=info.context.user)
        except Exception as e:
            raise GraphQLError(e)
        else:
            new_like.save()
        return LikeComment(like=new_like)


class UnlikePost(graphene.Mutation):
    """
    removes like to the specified post.
    """
    class Arguments:
        like_unique_identifier = graphene.String(required=True, description="Unique identifier of the like")

    ' Fields '
    successful = graphene.Boolean()

    def mutate(self, info, like_unique_identifier):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        try:
            like = LikeModel.objects.filter(
                unique_identifier=like_unique_identifier
            ).get()
        except Exception as e:
            raise GraphQLError(e)
        else:
            like.delete()
        return UnlikePost(successful=True)


class UnlikeComment(graphene.Mutation):
    """
    removes like to the specified comment.
    """
    class Arguments:
        like_unique_identifier = graphene.String(required=True, description="Unique identifier of the like")

    ' Fields '
    successful = graphene.Boolean()

    def mutate(self, info, like_unique_identifier):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        try:
            like = LikeModel.objects.filter(
                unique_identifier=like_unique_identifier
            ).get()
        except Exception as e:
            raise GraphQLError(e)
        else:
            like.delete()
        return UnlikeComment(successful=True)
