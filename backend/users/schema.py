import graphene
from graphql import GraphQLError
from backend.users.schemas.queries import UserType, UserFilter, UserNode
from backend.users.schemas.mutations import (
    Register, Login, UpdateProfile, Logout, DeleteAccount
)
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    user = graphene.relay.Node.Field(UserNode)
    users = DjangoFilterConnectionField(UserNode, filterset_class=UserFilter)
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Not Logged in!')
        return user


class Mutation(graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    update_profile = UpdateProfile.Field()
    logout = Logout.Field()
    delete_account = DeleteAccount.Field()
