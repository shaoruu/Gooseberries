import graphene
import django_filters
from graphene_django import DjangoObjectType
from graphql_jwt.utils import jwt_encode, jwt_payload
from backend.users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User


class UserFilter(django_filters.FilterSet):
    class Meta:
        model = User
        fields = {
            'username': ['exact', 'icontains', 'istartswith', 'iendswith'], 
            'first_name': ['exact', 'icontains', 'istartswith', 'iendswith'], 
            'last_name': ['exact', 'icontains', 'istartswith', 'iendswith'],
        }


class UserNode(DjangoObjectType):
    token = graphene.String()
    class Meta:
        model = User
        interfaces = (graphene.relay.Node, )

    def resolve_token(self, info, **kwargs):
        if info.context.user != self:
            return None

        payload = jwt_payload(self)
        return jwt_encode(payload)


