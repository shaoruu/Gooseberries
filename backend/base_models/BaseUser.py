from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import (
    check_password, make_password
)
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.contrib.auth.base_user import BaseUserManager


class BaseUser(models.Model):
    first_name = models.CharField(max_length=25, default="")
    middle_name = models.CharField(max_length=25, blank=True, default="")
    last_name = models.CharField(max_length=25, default="")
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        max_length=15, 
        unique=True,
        validators=[username_validator],
        error_messages={'unique': "A user with that username already exists.",}
    )
    email = models.EmailField()
    password = models.CharField(max_length=128)
    
    date_joined = models.DateTimeField(default=timezone.now)
    
    _password = None

    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self._password = raw_password

    def check_password(self, raw_password):
        """
        Return a boolean of whether the password passed in is correct.
        Handles hashing formats behind the scenes;
        """
        def setter(raw_password):
            self.set_password(raw_password)
            # Password hash upgrades shouldn't be considered password changes.
            self._password = None
            self.save(update_fields=["password"])
        return check_password(raw_password, self.password, setter)


    def get_user_id(self):
        return self.id

    def get_full_name(self):
        return f"{self.first_name} + {self.last_name}"

    class Meta:
        ordering = ['last_name', 'first_name'] 
        abstract = True





