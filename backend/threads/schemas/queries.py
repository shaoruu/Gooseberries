import graphene
import django_filters
from graphene_django import DjangoObjectType
from backend.threads.models import Thread, ThreadMember


class ThreadFilter(django_filters.FilterSet):
    class Meta:
        model = Thread
        fields = {
            'name': ['exact', 'icontains', 'istartswith'],
            'description': ['icontains'],
            'is_open': ['exact'],
        }


class ThreadNode(DjangoObjectType):
    admins = graphene.List(lambda: ThreadMemberNode) 

    class Meta:
        model = Thread
        interfaces = (graphene.relay.Node, )

    def resolve_admins(self, info):
        return [membership for membership in ThreadMember.objects.all() if membership.thread.name == self.name and membership.is_admin]

    def resolve_thread_image(self, info):
        return 'data:image/png;base64,' + self.get_thread_image_base64()


class ThreadMemberNode(DjangoObjectType):
    class Meta:
        model = ThreadMember
        interfaces = (graphene.relay.Node, )
