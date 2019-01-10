import graphene
import graphql_jwt

import backend.users.schema
import backend.threads.schema
import backend.posts.schema

class Query(backend.users.schema.Query, 
            backend.threads.schema.Query,
            backend.posts.schema.Query,
            graphene.ObjectType):
    pass

class Mutation(backend.users.schema.Mutation, 
               backend.threads.schema.Mutation, 
               backend.posts.schema.Mutation,
               graphene.ObjectType):
    # token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    # verify_token = graphql_jwt.Verify.Field()
    # refresh_token = graphql_jwt.Refresh.Field()
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
