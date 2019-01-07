import graphene

class UserAttribute:
    first_name = graphene.String(description="User's first name", required=True)
    last_name = graphene.String(description="User's last name", required=True)
    username = graphene.String(description="User's username", required=True)
    email = graphene.String(description="User's email", required=True)
    password = graphene.String(description="User's password", required=True)
    bio = graphene.String(description="User's biography", default_value=None)
    job_title = graphene.String(description="User's job", default_value=None)
    github_account = graphene.String(description="URL to user's Github account", default_value=None)
    linkedin_account = graphene.String(description="URL to user's Linkedin account", default_value=None)
    facebook_account = graphene.String(description="URL to user's Facebook account", default_value=None)
    twitter_account = graphene.String(description="URL to user's twitter account", default_value=None)

class PostAttribute:
    title = graphene.String(description="Post title", required=True)
    content = graphene.String(description="Post content", required=True)
    is_posted = graphene.Boolean(description="Post status", default_value=False)
    user_id = graphene.ID(description="Author ID of the post", required=True)
    thread_id = graphene.ID(description="Thread ID of the post", required=True)

class ThreadAttribute:
    name = graphene.String(description="Name of the thread", required=True)
    description = graphene.String(description="Description of the thread", required=True)

    
