from django.db import models
from django.conf import settings
from django.utils import timezone
from backend.posts.models import Post
from backend.utils import id_generator
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class Comment(models.Model):
    unique_identifier = models.CharField(max_length=8, default=id_generator, primary_key=True)
    content = models.CharField(max_length=100)
    
    ' Relations to other models '
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="post_comments", on_delete=models.CASCADE)
    # Generic Foreign Key to either Post or Comment
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    identifier = models.CharField(max_length=8)  # the field that can store primary keys
    content_object = GenericForeignKey(ct_field='content_type', fk_field='identifier')

    ' Timestamps '
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['content', 'user', 'post']

    class Meta:
        ordering = ['date_created', 'date_updated', 'content']

    def __str__(self):
        return self.content


# class CommentComment(models.Model):
    # content = models.CharField()
