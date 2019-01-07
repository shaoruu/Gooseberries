from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractUser, BaseUserManager
)


class User(AbstractUser):
    """
    Basic structure of the User model.
    username, password, first/last names are handled behind
    the scenes by the AbstractUser class.
    """
    email = models.EmailField(unique=True, max_length=255)
    date_of_birth = models.DateField()
    # profile_image = models.ImageField(default="default.jpg")
    bio = models.TextField(max_length=255)
    is_admin = models.BooleanField(default=False)

    date_joined = models.DateTimeField(editable=False)
    last_login = models.DateTimeField()
    
    # TODO: create a custom user manager
    # objects = UserManager()

    REQUIRED_FIELDS = ['email', 'date_of_birth']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.date_joined = timezone.now()
        self.last_login = timezone.now()
        return super(User, self).save(*args, **kwargs)

    @property
    def is_admin(self):
        "Is the user an admin of the site?"
        return is_admin
    
