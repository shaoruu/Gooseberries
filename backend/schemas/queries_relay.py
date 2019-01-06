import graphene
import django_filters
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from backend.models import User, Post, Thread, Like


class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']

class UserNode(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (graphene.relay.Node, )

class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = ['title', 'content']

class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        interfaces = (graphene.relay.Node, )

class ThreadFilter(django_filters.FilterSet):
    class Meta:
        model = Thread
        fields = ['name', 'description']

class ThreadNode(DjangoObjectType):
    class Meta:
        model = Thread
        interfaces = (graphene.relay.Node, )

class RelayQuery(graphene.ObjectType):
    relay_user = graphene.relay.Node.Field(UserNode)
    relay_users = DjangoFilterConnectionField(UserNode, filterset_class=UserFilter)
    relay_post = graphene.relay.Node.Field(PostNode)
    relay_posts = DjangoFilterConnectionField(PostNode, filterset_class=PostFilter)
    relay_thread = graphene.relay.Node.Field(ThreadNode)
    relay_threads = DjangoFilterConnectionField(ThreadNode, filterset_class=ThreadFilter)









