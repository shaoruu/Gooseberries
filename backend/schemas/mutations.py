import graphene
from graphql import GraphQLError
from backend.models import User, Post, Thread
from backend.schemas.queries import UserType, PostType, ThreadType
from backend.schemas.attributes import UserAttribute, PostAttribute, ThreadAttribute
from backend.utils import input_to_dictionary

class RegisterInput(graphene.InputObjectType, UserAttribute):
    """Arguments to create a user."""
    pass

class Register(graphene.Mutation):
    user = graphene.Field(lambda: UserType, description="Registered User")

    class Arguments:
        input = RegisterInput(required=True)

    def mutate(self, info, input):
        data_dict = input_to_dictionary(input)
        if User.objects.filter(username=data_dict['username']):
            raise GraphQLError('Username already taken.')
        if User.objects.filter(email=data_dict['email']):
            raise GraphQLError('Email already taken.')
        password = data_dict.pop('password')
        new_user = User(**data_dict)
        new_user.set_password(password)
        new_user.save()
        return Register(user=new_user)
        
