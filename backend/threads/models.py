from django.db import models
from backend.users.models import User
from django.utils import timezone 
from django.conf import settings
import uuid


class Thread(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=500)
    is_open = models.BooleanField(default=True)
    date_created = models.DateTimeField(default=timezone.now)

    # members = models.ManyToManyField(User, through='ThreadMember', related_name="joined_threads")

    REQUIRED_FIELDS = ['name', 'description']

    def __str__(self):
        return self.name

    '''
    Overriding the save function for future usages.
    '''
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        return super(Thread, self).save(*args, **kwargs)


class ThreadMember(models.Model):
    thread   = models.ForeignKey(Thread, related_name="memberships", on_delete=models.CASCADE)
    user     = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="thread_memberships", on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    nickname = models.CharField(max_length=25, default="")

    def __str__(self):
        return self.user.username
