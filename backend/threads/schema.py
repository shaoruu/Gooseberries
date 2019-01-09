import graphene
import traceback
from graphql import GraphQLError
from backend.threads.schemas.queries import ThreadFilter, ThreadNode, ThreadMemberNode
from backend.threads.schemas.mutations import (
    CreateThread, UpdateThread, JoinThread, LeaveThread, Promote, Demote
)
from graphene_django.filter import DjangoFilterConnectionField
from backend.threads.models import Thread as ThreadModel, ThreadMember as ThreadMemberModel


class Query(graphene.ObjectType):
    thread = graphene.Field(ThreadNode, name=graphene.String(required=True))
    threads = DjangoFilterConnectionField(ThreadNode, filterset_class=ThreadFilter)
    is_admin = graphene.Field(graphene.Boolean, thread_name=graphene.String(required=True, 
                                                            description="Name of the thread"))
    admins = graphene.List(ThreadMemberNode, required=True, 
                           thread_name=graphene.String(description="Name of the thread"))

    def resolve_thread(self, info, name):
        return ThreadModel.objects.get(name=name) 

    def resolve_is_admin(self, info, thread_name):
        try:
            thread = ThreadModel.objects.get(name=thread_name)
            membership = ThreadMemberModel.objects.filter(
                user=info.context.user, thread=thread
            ).get()
        except Exception as e:
            raise GraphQLError(traceback.format_exc())
        else:
            return membership.is_admin

    def resolve_admins(self, info, thread_name):
        return [membership for membership in ThreadMemberModel.objects.all() if membership.is_admin]


class Mutation(graphene.ObjectType):
    create_thread = CreateThread.Field()
    update_thread = UpdateThread.Field()
    join_thread   = JoinThread.Field()
    leave_thread  = LeaveThread.Field()
    promote       = Promote.Field()
    demote        = Demote.Field()
