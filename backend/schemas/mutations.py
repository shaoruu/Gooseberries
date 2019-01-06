import re
import string
import graphene
from graphql import GraphQLError
from backend.models import User, Post, Thread, Like
from backend.schemas.queries import UserType, PostType, ThreadType
from backend.schemas.attributes import UserAttribute, PostAttribute, ThreadAttribute
from backend.utils import input_to_dictionary
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class RegisterInput(graphene.InputObjectType):
    username = graphene.String(required=True, description="User's username")
    email = graphene.String(required=True, description="User's email")
    password = graphene.String(required=True, description="User's Password")
    first_name = graphene.String(description="User's first name", default_value="")
    last_name = graphene.String(description="User's last name", default_value="")


class Register(graphene.Mutation):
    user = graphene.Field(lambda: UserType, description="Registered User")

    class Arguments:
        input = RegisterInput(required=True)

    def mutate(self, info, input):
        data = input_to_dictionary(input)
        try:
            validate_email(data['email'])
        except ValidationError:
            raise GraphQLError('Invalid Email Format.')
        if User.objects.filter(username=data['username']).first():
            raise GraphQLError('Username Already Taken.')
        if User.objects.filter(email=data['email']).first():
            raise GraphQLError('Email Already Taken')
        invalid_chars = string.punctuation.replace("\'", "") + '1234567890'
        if (any(char in invalid_chars for char in data['first_name']) or
            any(char in invalid_chars for char in data['last_name'])):
            raise GraphQLError('Invalid first or last names')
        password = data.pop('password')
        new_user = User(**data)
        new_user.set_password(password)
        new_user.save()
        return Register(user=new_user)
        
class CreatePost(graphene.Mutation):
    post = graphene.Field(lambda: PostType, description="Created post")
    author = graphene.Field(lambda: UserType, description="Post author")

    class Arguments:
        title = graphene.String(required=True, description="Post title")
        content = graphene.String(required=True, description="Post content")
    
    def mutate(self, info, title, content):
        user = info.context.user or None
        if user.is_anonymous:
            raise GraphQLError('User not authenticated.')
        new_post = Post(title=title, content=content, posted_by=user)
        new_post.save()
        return CreatePost(post=new_post, author=new_post.posted_by)


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
        

















