import graphene
from graphql import GraphQLError
from backend.thread_members.models import ThreadMember as ThreadMemberModel
from backend.thread_members.schemas.queries import ThreadMemberNode



class JoinThread(graphene.Mutation):
    """
    Adds the calling user to the thread
    to the thread with the given name
    """
    class Arguments:
        thread_name = graphene.String(required=True, description="Thread to join")

    ' Fields '
    thread_member = graphene.Field()
