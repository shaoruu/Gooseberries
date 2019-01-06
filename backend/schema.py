import graphene
from .models import User, Post, Thread, Like
from backend.schemas.queries import (
    UserType, PostType, ThreadType, LikeType,
    UserFilter, UserNode, PostFilter, PostNode, ThreadFilter, ThreadNode)
from backend.schemas.mutations import Register, CreatePost, LikePost
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    user = graphene.relay.Node.Field(UserNode)
    users = DjangoFilterConnectionField(UserNode, filterset_class=UserFilter)
    post = graphene.relay.Node.Field(PostNode)
    posts = DjangoFilterConnectionField(PostNode, filterset_class=PostFilter)
    thread = graphene.relay.Node.Field(ThreadNode)
    threads = DjangoFilterConnectionField(ThreadNode, filterset_class=ThreadFilter)
    likes = graphene.List(LikeType)
    me = graphene.Field(UserType)

    def resolve_likes(self, info, **kwargs):
        return Like.objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged in!')
        return user


class Mutation(graphene.ObjectType):
    register = Register.Field() 
    create_post = CreatePost.Field()
    like_post = LikePost.Field()
