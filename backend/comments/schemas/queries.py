import graphene
import django_filters
from graphene_django import DjangoObjectType
from backend.comments.models import Comment
from django.contrib.contenttypes.models import ContentType
from graphene_django.filter import DjangoFilterConnectionField
from backend.likes.models import Like
from backend.likes.schemas.queries import LikeNode


class CommentFilter(django_filters.FilterSet):
    class Meta:
        model = Comment
        fields = {
            'content': ['icontains'],
            'user__username': ['exact']
        }


class CommentNode(DjangoObjectType):
    comments = DjangoFilterConnectionField(lambda: CommentNode, filterset_class=CommentFilter) 
    likes = graphene.List(LikeNode)

    class Meta:
        model = Comment
        interfaces = (graphene.relay.Node, )

    def resolve_comments(self, info):
        content_type = ContentType.objects.get_for_model(Comment)
        identifier = self.unique_identifier
        return Comment.objects.filter(content_type=content_type, identifier=identifier)

    def resolve_likes(self, info, **kwargs):
        content_type = ContentType.objects.get_for_model(Comment)
        identifier = self.unique_identifier
        return Like.objects.filter(content_type=content_type, identifier=identifier)
