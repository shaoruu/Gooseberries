import graphene

from .models import User, Post, Thread
from backend.schemas.queries import UserType, PostType, ThreadType
from backend.schemas.mutations import Register


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    posts = graphene.List(PostType)
    threads = graphene.List(ThreadType)

    def resolve_users(self, info, **kwargs):
        return User.objects.all()

    def resolve_posts(self, info, **kwargs):
        return Post.objects.all()

    def resolve_thread(self, info, **kwargs):
        return Thread.objects.all()


class Mutation(graphene.ObjectType):
    register = Register.Field() 
