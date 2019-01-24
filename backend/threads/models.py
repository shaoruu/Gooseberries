from django.db import models
from backend.users.models import User
from django.utils import timezone 
from django.conf import settings
import os
import base64
import uuid


class Thread(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=500)
    is_open = models.BooleanField(default=True)
    date_created = models.DateTimeField(default=timezone.now)

    thread_image = models.ImageField(default="default_thread.jpeg", upload_to="threads/profile")
    thread_banner = models.ImageField(default="default_thread_banner.jpeg", upload_to="threads/banner")

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

    def toggle_open(self):
        self.is_open = not self.is_open

    def get_thread_image_base64(self):
        return image_as_base64(self.thread_image.path)

    def get_thread_banner_base64(self):
        return image_as_base64(self.thread_banner.path)


class ThreadMember(models.Model):
    thread   = models.ForeignKey(Thread, related_name="memberships", on_delete=models.CASCADE)
    user     = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="thread_memberships", on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    nickname = models.CharField(max_length=25, default="")

    REQUIRED_FIELDS = ['thread', 'user']

    def __str__(self):
        return self.user.username

    def set_nickname(self, nickname):
        self.nickname = nickname


def image_as_base64(image_file, format='jpeg'):
    if not os.path.isfile(image_file):
        return image_file

    encoded_string = ''
    with open(image_file, 'rb') as img_f:
        encoded_string = base64.b64encode(img_f.read()).decode('utf-8')
    return encoded_string
