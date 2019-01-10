import graphene
from backend.posts.schemas.queires import PostNode, PostFilter
from backend.posts.schemas.mutations import CreatePostOnThread
from graphene_django.filter import DjangoFilterConnectionField


class Query(graphene.ObjectType):
    post = graphene.Field(PostNode, title=graphene.String(required=True))
    posts = DjangoFilterConnectionField(PostNode, filterset_class=PostFilter)

    def resolve_post(self, info, title):
        return ThreadModel.objects.get(title=title)


class Mutation(graphene.ObjectType):
    create_post_on_thread = CreatePostOnThread.Field()
