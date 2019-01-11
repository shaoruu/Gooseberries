import graphene
from backend.likes.schemas.queries import LikeNode
from backend.likes.models import Like
from backend.likes.schemas.mutations import (
    LikePost, LikeComment, UnlikePost, UnlikeComment
)


class Query(graphene.ObjectType):
    like  = graphene.Field(LikeNode, unique_identifier=graphene.String(required=True, description="The unique identifier of the like object"))
    likes = graphene.List(LikeNode, required=True, username=graphene.String())

    def resolve_like(self, info, unique_identifier):
        return Like.objects.get(unique_identifier=unique_identifier)

    def resolve_likes(self, info, username):
        return [like for like in Like.objects.all() if like.user.username == username]


class Mutation(graphene.ObjectType):
    like_post = LikePost.Field()
    like_comment = LikeComment.Field()
    unlike_post = UnlikePost.Field()
    unlike_comment = UnlikeComment.Field()
