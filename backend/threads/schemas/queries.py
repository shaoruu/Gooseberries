import graphene
import django_filters
from graphene_django import DjangoObjectType
from backend.threads.models import Thread


class ThreadFilter(django_filters.FilterSet):
    class Meta:
        model = Thread
        fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'description': ['icontains'],
            'is_open': ['exact'],
        }


class CustomThreadNode(graphene.relay.Node):
    class Meta:
        name = 'CustomNode'

    @staticmethod
    def to_global_id(type, id):
        return id


class ThreadNode(DjangoObjectType):
    class Meta:
        model = Thread
        interfaces = (CustomThreadNode, )
