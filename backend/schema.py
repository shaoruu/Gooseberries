import graphene

from .models import User, Post, Thread, Like
from backend.schemas.queries import UserType, PostType, ThreadType, LikeType
from backend.schemas.mutations import Register, CreatePost, LikePost
from django.db.models import Q


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    posts = graphene.List(PostType)
    threads = graphene.List(ThreadType)
    likes = graphene.List(LikeType)
    me = graphene.Field(UserType)

    def resolve_users(self, info, search=None, search_name=None, **kwargs):
        if search:
            filter = Q(username__icontains=search)
            return User.objects.filter(filter)
        elif search_name:
            filter = Q(firstname__icontains=search_name | Q(lastname__icontains=search_name))
            return User.objects.filter(filter)
        return User.objects.all()

    def resolve_posts(self, info, search=None, **kwargs):
        if search:
            filter = (Q(title__icontains=search) | Q(content__icontains=search))
            return Post.objects.filter(filter)
        return Post.objects.all()

    def resolve_threads(self, info, **kwargs):
        return Thread.objects.all()

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
