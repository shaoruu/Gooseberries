import graphene
from graphql import GraphQLError
from backend.threads.schemas.queries import ThreadFilter, ThreadNode
from backend.threads.schemas.mutations import CreateThread, UpdateThread
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    thread = graphene.relay.Node.Field(ThreadNode)
    threads = DjangoFilterConnectionField(ThreadNode, filterset_class=ThreadFilter)


class Mutation(graphene.ObjectType):
    create_thread = CreateThread.Field()
    update_thread = UpdateThread.Field()
