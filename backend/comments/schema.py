import graphene
from backend.comments.schemas.queries import CommentNode, CommentFilter
from backend.comments.schemas.mutations import (
    CreateCommentOnPost,
    CreateCommentOnComment,
    UpdateComment,
    DeleteComment,
)
from backend.comments.models import Comment
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    comment = graphene.Field(CommentNode, unique_identifier=graphene.String(required=True, description="The unique identifier of the comment author"))
    comments = DjangoFilterConnectionField(CommentNode, filterset_class=CommentFilter)

    def resolve_comment(self, info, unique_identifier):
        return Comment.objects.get(unique_identifier=unique_identifier)


class Mutation(graphene.ObjectType):
    create_comment_on_post = CreateCommentOnPost.Field()
    create_comment_on_comment = CreateCommentOnComment.Field()
    update_comment = UpdateComment.Field()
    delete_comment = DeleteComment.Field()
