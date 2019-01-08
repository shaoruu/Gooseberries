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


class ThreadNode(DjangoObjectType):
    class Meta:
        model = Thread
        interfaces = (graphene.relay.Node, )
