import string
import graphene
from graphql import GraphQLError
from django.contrib.auth import authenticate, login, logout
from backend.users.schemas.queries import UserNode
from backend.users.models import User as UserModel
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.validators import ASCIIUsernameValidator


class Register(graphene.relay.ClientIDMutation):
    """
    Registers user with the provided parameters,
    returns back a User node.
    """
    class Input:
        username      = graphene.String(required=True, description="User's username")
        email         = graphene.String(required=True, description="User's email")
        password      = graphene.String(required=True, description="User's password")
        date_of_birth = graphene.types.datetime.Date(required=True, description="User's date of birth")
        first_name    = graphene.String(description="User's first name", default_value="")
        last_name     = graphene.String(description="User's last name", default_value="")

    ' Fields '
    user = graphene.Field(UserNode)

    def mutate_and_get_payload(root, info, **input):
        "Extra username validation"
        if ' ' in input.get('username'):
            raise GraphQLError('Invalid username format.')
        "Email validation"
        try:
            validate_email(input.get('email'))
        except ValidationError:
            raise GraphQLError('Invalid email format.')
        "Checks to see if the user exists in the database"
        if UserModel.objects.filter(username=input.get('username')).first():
            raise GraphQLError('Username already taken.')
        if UserModel.objects.filter(email=input.get('email')).first():
            raise GraphQLError('Email already taken.')
        if not validate_name(input.get('first_name')) or not validate_name(input.get('last_name')):
            raise GraphQLError('Invalid first/last name.')
        password = input.pop('password')
        new_user = UserModel(**input)
        new_user.set_password(password)
        new_user.save()
        return Register(user=new_user)


class Login(graphene.relay.ClientIDMutation):
    """
    Login function; the login process is handled backend by Django.
    """
    class Input:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    ' Fields '
    user = graphene.Field(UserNode)

    def mutate_and_get_payload(root, info, **input):
        user = authenticate(**input)

        # Wrong Credentials
        if user is None:
            raise GraphQLError('Please enter a correct username and password')

        # Disabled User
        if not user.is_active:
            raise GraphQLError('It seems like your account has been disabled.')

        login(info.context, user)
        return Login(user=user)

class Logout(graphene.Mutation):
    """
    Logs the user out, returning a boolean indicating whether the process
    was successful or not. No input needed; logout handled behind the scenes.
    """

    ' Fields '
    successful = graphene.Boolean()

    def mutate(self, info):
        if info.context.user.is_anonymous:
            raise GraphQLError('Not logged in.')
        try: 
            logout(info.context)
        except: 
            raise GraphQLError('Failed to log in.')
        return Logout(successful=True)
        

        
class UpdateProfile(graphene.relay.ClientIDMutation):
    """
    Update user's profile according to the provided optional arguments.
    """
    class Input:
        first_name = graphene.String()
        last_name  = graphene.String()
        # profile_image
    
    ' Fields '
    user = graphene.Field(UserNode)

    def mutate_and_get_payload(root, info, **input):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('Please login first to modify profile.')

        if not validate_name(input.get('first_name')) or not validate_name(input.get('last_name')):
            raise GraphQLError('Invalid first/last name.')
        
        filtered_input = {k:v for k,v in input.items() if v}

        updated_user = UserModel.objects.filter(id=user.id).first()
        for (key, value) in filtered_input.items():
            setattr(updated_user, key, value)
        updated_user.save()

        return UpdateProfile(user=updated_user)
    

class DeleteAccount(graphene.Mutation):
    """
    Logouts the user and deletes the account.
    No input required; logout handled by Django.
    """

    ' Fields '
    user = graphene.Field(UserNode)

    def mutate(self, info):
        user = info.context.user
        deleted_user = info.context.user
        
        if user.is_anonymous:
            raise GraphQLError('Not authorized.')

        try:
            logout(info.context)
            user.delete()
        except:
            raise GraphQLError('Failed to delete account.')

        return DeleteAccount(user=deleted_user)


def validate_name(str):
    "Name Validation"
    if not str:
        return True
    invalid_chars = string.punctuation.replace("\'", "") + "1234567890"
    if (any(char in invalid_chars for char in str)):
        return False
    return True
