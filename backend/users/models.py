import os
import base64
from django.db import models
from django.utils import timezone
from PIL import Image
from django.contrib.auth.models import (
    AbstractUser, BaseUserManager
)
from django.conf import settings


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

    image = models.ImageField(default='default.jpeg', upload_to='profile_pics')

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

        img = Image.open(self.image.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path, "JPEG")

        super(User, self).save(*args, **kwargs)

    def get_image_base64(self):
        return image_as_base64(self.image.path)

    # @property
    # def is_superuser(self):
        # "Is the user a staff of the site?"
        # return is_staff
    

def image_as_base64(image_file, format='jpeg'):
    if not os.path.isfile(image_file):
        return image_file

    encoded_string = ''
    with open(image_file, 'rb') as img_f:
        encoded_string = base64.b64encode(img_f.read()).decode('utf-8')
    return encoded_string
