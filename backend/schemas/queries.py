import graphene
from graphene_django import DjangoObjectType
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

