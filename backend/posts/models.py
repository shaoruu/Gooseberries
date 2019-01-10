from django.db import models
from django.conf import settings
from django.utils import timezone
from backend.threads.models import Thread 
from backend.utils import id_generator

class Post(models.Model):
    unique_identifier = models.CharField(max_length=8, default=id_generator)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=10000)
    published = models.BooleanField(default=False)

    ' Relations to other models '
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="posts", on_delete=models.CASCADE)
    thread = models.ForeignKey(Thread, related_name="posts", on_delete=models.CASCADE)

    ' Timestamps '
    date_created = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now_add=True)

    REQUIRED_FIELDS = ['title', 'description', 'user', 'thread']

    class Meta:
        ordering = ['date_created', 'date_updated', 'title']

    def __str__(self):
        return self.title

    def toggle_published(self):
        self.published = not self.published


