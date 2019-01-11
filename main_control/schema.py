import graphene
import graphql_jwt

import backend.comments.schema
import backend.likes.schema
import backend.posts.schema
import backend.threads.schema
import backend.users.schema

class Query(backend.comments.schema.Query,
            backend.likes.schema.Query,
            backend.posts.schema.Query,
            backend.threads.schema.Query,
            backend.users.schema.Query, 
            graphene.ObjectType):
    pass

class Mutation(backend.users.schema.Mutation, 
               backend.threads.schema.Mutation, 
               backend.posts.schema.Mutation,
               backend.comments.schema.Mutation,
               backend.likes.schema.Mutation,
               graphene.ObjectType):
    # token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    # verify_token = graphql_jwt.Verify.Field()
    # refresh_token = graphql_jwt.Refresh.Field()
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
