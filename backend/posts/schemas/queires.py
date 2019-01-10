import graphene
import django_filters
from graphene_django import DjangoObjectType
from backend.posts.models import Post


class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'content': ['icontains'],
            'published': ['exact'],
        }


class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        interfaces = (graphene.relay.Node, )
