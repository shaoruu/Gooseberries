import graphene
from graphql import GraphQLError
from backend.users.schemas.queries import UserFilter, UserNode
from backend.users.schemas.mutations import (
    Register, Login, UpdateProfile, Logout, DeleteAccount, EnableAccount, DisableAccount
)
from graphene_django.filter import DjangoFilterConnectionField
from backend.users.models import User as UserModel


class Query(graphene.ObjectType):
    user = graphene.Field(UserNode, username=graphene.String(required=True))
    # user = graphene.relay.Node.Field(UserNode)
    users = DjangoFilterConnectionField(UserNode, filterset_class=UserFilter)
    me = graphene.Field(UserNode)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Not Logged in!')
        return user

    def resolve_user(self, info, username):
        return UserModel.objects.get(username=username)


class Mutation(graphene.ObjectType):
    register = Register.Field()
    login = Login.Field()
    update_profile = UpdateProfile.Field()
    logout = Logout.Field()
    delete_account = DeleteAccount.Field()
    enable_account = EnableAccount.Field()
    disable_account = DisableAccount.Field()
