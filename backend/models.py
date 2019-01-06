from django.db import models
from django.utils import timezone
# from backend.base_models.BaseUser import BaseUser
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    bio = models.CharField(max_length=50, blank=True, default="")
    job_title = models.CharField(max_length=50, blank=True, default="")
    github_account = models.URLField(max_length=255, blank=True, null=True)
    linkedin_account = models.URLField(max_length=255, blank=True, null=True)
    facebook_account = models.URLField(max_length=255, blank=True, null=True)
    twitter_account = models.URLField(max_length=255, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    threads = models.ManyToManyField('Thread', blank=True)

    def __str__(self):
        return self.get_full_name()

    def add_github(self, link):
        self.github_account = link 

    def add_linkedin(self, link):
        self.linkedin_account = link

    def add_facebook(self, link):
        self.facebook_account = link

    def add_twitter(self, link):
        self.twitter_account = link
    
    class Meta:
        db_table = 'user'


class Post(models.Model):
    id = models.BigAutoField(primary_key=True)
    title = models.CharField(max_length=100)
    content = models.TextField()
    is_posted = models.BooleanField(default=False)
    date_posted = models.DateTimeField(default=timezone.now)
    date_updated = models.DateTimeField(auto_now=True) 
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    thread = models.ForeignKey('Thread', on_delete=models.CASCADE)

    def post(self):
        self.is_posted = True

    def __str__(self):
        return f"'{self.title}' '{self.user.username}' '{self.date_posted}'"

    class Meta:
        db_table = 'post'
        ordering = ['date_posted', 'date_updated']

class Thread(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=30, unique=True)
    description = models.TextField()
    
    def __str__(self):
        return f"'{self.name}'"



