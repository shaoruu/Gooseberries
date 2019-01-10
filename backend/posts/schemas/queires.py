import graphene
import django_filters
from graphene_django import DjangoObjectType
from backend.posts.models import Post
from backend.comments.schemas.queries import CommentNode, CommentFilter
from django.contrib.contenttypes.models import ContentType
from graphene_django.filter import DjangoFilterConnectionField
from backend.comments.models import Comment


class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'content': ['icontains'],
            'unique_identifier': ['exact'],
            'published': ['exact'],
        }


class PostNode(DjangoObjectType):
    comments = DjangoFilterConnectionField(CommentNode, filterset_class=CommentFilter) 
    class Meta:
        model = Post
        interfaces = (graphene.relay.Node, )

    def resolve_comments(self, info, **kwargs):
        content_type = ContentType.objects.get_for_model(Post)
        identifier = self.unique_identifier
        return Comment.objects.filter(content_type=content_type, identifier=identifier)
