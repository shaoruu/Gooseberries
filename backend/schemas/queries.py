import graphene
from graphene_django import DjangoObjectType
from backend.models import User, Post, Thread

class UserType(DjangoObjectType):
    class Meta:
        model = User

class PostType(DjangoObjectType):
    class Meta:
        model = Post

class ThreadType(DjangoObjectType):
    class Meta:
        model = Thread

