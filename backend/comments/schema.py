import graphene
from backend.comments.schemas.queries import CommentNode, CommentFilter
from backend.comments.schemas.mutations import (
    CreateCommentOnPost,
    CreateCommentOnComment,
    UpdateComment,
    DeleteComment,
)
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    comment = graphene.relay.Node.Field(CommentNode)
    comments = DjangoFilterConnectionField(CommentNode, filterset_class=CommentFilter)


class Mutation(graphene.ObjectType):
    create_comment_on_post = CreateCommentOnPost.Field()
    create_comment_on_comment = CreateCommentOnComment.Field()
    update_comment = UpdateComment.Field()
    delete_comment = DeleteComment.Field()
