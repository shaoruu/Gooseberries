from django.db import models
from django.utils import timezone


class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    first_name = models.CharField(max_length=25, null=True)
    middle_name = models.CharField(max_length=25, blank=True)
    last_name = models.CharField(max_length=25, null=True)
    username = models.CharField(max_length=15)
    email = models.EmailField()
    password = models.CharField(max_length=20)
    bio = models.CharField(max_length=50, blank=True, null=True)
    job_title = models.CharField(max_length=50, blank=True, null=True)
    github_account = models.URLField(max_length=255, blank=True, null=True)
    linkedin_account = models.URLField(max_length=255, blank=True, null=True)
    facebook_account = models.URLField(max_length=255, blank=True, null=True)
    twitter_account = models.URLField(max_length=255, blank=True, null=True)
    date_registered = models.DateTimeField(default=timezone.now)
    threads = models.ManyToManyField('Thread', blank=True)

    def __str__(self):
        return f"'{self.get_full_name()}' '{self.email}'"

    def get_user_id(self):
        return self.id

    def get_full_name(self):
        return f"{self.first_name} + {self.last_name}"

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
        ordering = ['last_name', 'first_name'] 


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



