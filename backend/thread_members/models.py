from django.db import models
from backend.threads.models import Thread
from backend.users.models import User
from django.conf import settings

class ThreadMember(models.Model):
    thread = models.ForeignKey(Thread, related_name='memberships', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="threads", on_delete=models.CASCADE)
    nickname = models.CharField(max_length=25, default="")
    is_admin = models.BooleanField(default=False)

