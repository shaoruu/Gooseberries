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
    bio = models.TextField(max_length=500)

    # email authentication confirmation
    auth_confirmed = models.BooleanField(default=False)

    date_joined = models.DateTimeField(editable=False)
    last_login = models.DateTimeField()
    
    # TODO: create a custom user manager
    # objects = UserManager()

    REQUIRED_FIELDS = ['email', 'date_of_birth']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return self.first_name + self.last_name 

    def enable(self):
        self.is_active = True

    def disable(self):
        self.is_active = False

    def save(self, called_by_admin=False, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            ''' Initialization of the timestamps '''
            self.date_joined = timezone.now()
            self.last_login = timezone.now()
        if not called_by_admin: 
            ''' User has modified his/her own profile '''
            self.last_login = timezone.now()
        return super(User, self).save(*args, **kwargs)

    # @property
    # def is_superuser(self):
        # "Is the user a staff of the site?"
        # return is_staff
    
