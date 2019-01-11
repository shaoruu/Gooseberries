from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from backend.utils import id_generator


class Like(models.Model):
    unique_identifier = models.CharField(max_length=8, default=id_generator, primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="likes", on_delete=models.CASCADE)
    # Generic Foreign Key to either Post or Comment
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    identifier = models.CharField(max_length=8)
    content_object = GenericForeignKey('content_type', 'identifier')

    ' Timestamps '
    date_created = models.DateTimeField(default=timezone.now)
    
    REQUIRED_FIELDS = ['user', 'content_type', 'identifier', 'content_objects']

    class Meta:
        ordering = ['date_created', 'user__username']

    def __str__(self):
        return self.user.username
