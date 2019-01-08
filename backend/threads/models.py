from django.db import models
from django.utils import timezone 
import uuid


class Thread(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=500)
    is_open = models.BooleanField(default=True)
    date_created = models.DateTimeField(default=timezone.now)

    REQUIRED_FIELDS = ['name', 'description']

    def __str__(self):
        return self.name

    '''
    Overriding the save function for future usages.
    '''
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        return super(Thread, self).save(*args, **kwargs)
