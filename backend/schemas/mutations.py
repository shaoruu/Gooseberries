import graphene
from graphql import GraphQLError
from backend.models import User, Post, Thread
from backend.schemas.queries import UserType, PostType, ThreadType
from backend.schemas.attributes import UserAttribute, PostAttribute, ThreadAttribute
from backend.utils import input_to_dictionary
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


class Register(graphene.Mutation):
    user = graphene.Field(lambda: UserType, description="Registered User")

    class Arguments:
        username = graphene.String(description="User's username", required=True)
        email = graphene.String(description="User's email", required=True)
        password = graphene.String(description="User's Password", required=True)

    def mutate(self, info, username, email, password):
        try:
            validate_email(email)
        except ValidationError:
            raise GraphQLError('Invalid Email Format.')
        if User.objects.filter(username=username):
            raise GraphQLError('Username Already Taken.')
        if User.objects.filter(email=email):
            raise GraphQLError('Email Already Taken')
        new_user = User(username=username, email=email)
        new_user.set_password(password)
        new_user.save()
        return Register(user=new_user)
        
