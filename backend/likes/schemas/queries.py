import graphene
from graphene_django import DjangoObjectType
from backend.likes.models import Like
from django.contrib.contenttypes.models import ContentType


class LikeNode(DjangoObjectType):
    class Meta:
        model = Like
        interfaces = (graphene.relay.Node, )
