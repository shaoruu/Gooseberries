import graphene
import graphql_jwt

import backend.schema

class Query(backend.schema.Query, graphene.ObjectType):
    pass

class Mutation(backend.schema.Mutation, graphene.ObjectType):
    # token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
