import graphene 
from graphene_django import DjangoObjectType
from backend.thread_members.models import ThreadMember


class ThreadMemberNode(DjangoObjectType):
    class Meta:
        model = ThreadMember
        interfaces = (graphene.relay.Node, )

