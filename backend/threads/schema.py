import graphene
import traceback
from graphql import GraphQLError
from backend.threads.schemas.queries import ThreadFilter, ThreadNode
from backend.threads.schemas.mutations import (
    CreateThread, UpdateThread, JoinThread, LeaveThread, 
    Promote, Demote, DeleteThread, SetNickname, ToggleThreadMode
)
from graphene_django.filter import DjangoFilterConnectionField
from backend.threads.models import Thread as ThreadModel


class Query(graphene.ObjectType):
    thread = graphene.Field(ThreadNode, name=graphene.String(required=True))
    threads = DjangoFilterConnectionField(ThreadNode, filterset_class=ThreadFilter)

    def resolve_thread(self, info, name):
        return ThreadModel.objects.get(name=name) 


class Mutation(graphene.ObjectType):
    create_thread      = CreateThread.Field()
    update_thread      = UpdateThread.Field()
    delete_thread      = DeleteThread.Field()
    join_thread        = JoinThread.Field()
    leave_thread       = LeaveThread.Field()
    set_nickname       = SetNickname.Field()
    toggle_thread_mode = ToggleThreadMode.Field()
    promote            = Promote.Field()
    demote             = Demote.Field()
