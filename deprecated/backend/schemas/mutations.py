import re
import string
import graphene
from graphql import GraphQLError
from django.contrib.auth import authenticate, login, logout
from backend.models import User, Post, Thread, Like
from backend.schemas.queries import UserNode, PostNode, ThreadNode, UserType, PostType, ThreadType, LikeType
from backend.schemas.attributes import UserAttribute, PostAttribute, ThreadAttribute
from backend.utils import input_to_dictionary
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class Register(graphene.relay.ClientIDMutation):
    user = graphene.Field(UserNode)

    class Input:
        username = graphene.String(required=True, description="User's username")
        email = graphene.String(required=True, description="User's email")
        password = graphene.String(required=True, description="User's Password")
        first_name = graphene.String(description="User's first name", default_value="")
        last_name = graphene.String(description="User's last name", default_value="")
    
    def mutate_and_get_payload(root, info, **input):
        try:
            validate_email(input.get('email'))
        except ValidationError:
            raise GraphQLError('Invalid email format.')
        if User.objects.filter(username=input.get('username')).first():
            raise GraphQLError('Username already taken.')
        if User.objects.filter(email=input.get('email')).first():
            raise GraphQLError('Email Already Taken')
        invalid_chars = string.punctuation.replace("\'", "") + '1234567890'
        if (any(char in invalid_chars for char in input.get('first_name')) or
            any(char in invalid_chars for char in input.get('last_name'))):
            raise GraphQLError('Invalid first or last names')
        password = input.pop('password')
        new_user = User(**input)
        new_user.set_password(password)
        new_user.save()
        return Register(user=new_user)

        

class CreatePost(graphene.relay.ClientIDMutation):
    post = graphene.Field(lambda: PostType, description="Created post")
    author = graphene.Field(lambda: UserType, description="Post author")

    class Input:
        title = graphene.String(required=True, description="Post title")
        content = graphene.String(required=True, description="Post content")

    def mutate_and_get_payload(root, info, **input):
        user = info.context.user or None
        if user.is_anonymous:
            raise GraphQLError('User not authenticated.')
        new_post = Post(**input, posted_by=user)
        new_post.save()
        return CreatePost(post=new_post, author=new_post.posted_by)


class LogIn(graphene.relay.ClientIDMutation):
    user = graphene.Field(UserNode)

    class Input:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate_and_get_payload(root, info, **input):
        user = authenticate(username=input.get('username'), password=input.get('password'))

        if user is None:
            raise GraphQLError('Please enter a correct username and password.')

        if not user.is_active:
            raise GraphQLError('It seems like your account has been disabled.')

        login(info.context, user)
        return LogIn(user=user)

class LogOut(graphene.Mutation):
    successful = graphene.Boolean()
    def mutate(self, info):
        try:
            logout(info.context)
        except:
            raise GraphQLError("Failed logging out.")
        return LogOut(successful=True)

class LikePost(graphene.Mutation):
    user = graphene.Field(UserType)
    post = graphene.Field(PostType)

    class Arguments:
        post_id = graphene.Int(required=True)

    def mutate(self, info, post_id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Login first to like posts.')
        liked_post = Post.objects.filter(id=post_id).first()
        if not liked_post:
            raise GraphQLError('Cannot find post with the provided post id.')
        Like.objects.create(user=user, post=liked_post)
        return LikePost(user=user, post=liked_post)
        

















