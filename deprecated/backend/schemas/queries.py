import graphene
import django_filters
from graphene_django import DjangoObjectType
from graphql_jwt.utils import jwt_encode, jwt_payload
from backend.models import User, Post, Thread, Like

class UserType(DjangoObjectType):
    class Meta:
        model = User

class PostType(DjangoObjectType):
    class Meta:
        model = Post

class LikeType(DjangoObjectType):
    class Meta:
        model = Like

class ThreadType(DjangoObjectType):
    class Meta:
        model = Thread

class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = {
            'username': ['exact', 'icontains', 'istartswith', 'iendswith'], 
            'first_name': ['exact', 'icontains', 'istartswith', 'iendswith'], 
            'last_name': ['exact', 'icontains', 'istartswith', 'iendswith'],
        }

class UserNode(DjangoObjectType):
    token = graphene.String()
    class Meta:
        model = User
        interfaces = (graphene.relay.Node, )

    def resolve_token(self, info, **kwargs):
        if info.context.user != self:
            return None

        payload = jwt_payload(self)
        return jwt_encode(payload)

class PostFilter(django_filters.FilterSet):
    class Meta:
        model = Post
        fields = {
            'title': ['icontains'],
            'content': ['icontains'],
        }

class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        interfaces = (graphene.relay.Node, )

class ThreadFilter(django_filters.FilterSet):
    class Meta:
        model = Thread
        fields = {
            'name': ['icontains', 'istartswith', 'iendswith'],
            'description': ['icontains'],
        }

class ThreadNode(DjangoObjectType):
    class Meta:
        model = Thread
        interfaces = (graphene.relay.Node, )










