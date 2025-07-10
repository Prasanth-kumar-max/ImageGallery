from django.db import models
from django.contrib.auth.models import User

class Image(models.Model):
    photo = models.ImageField(upload_to='myimage/')
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.photo.name

class Upload(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='uploads/')
    date = models.DateTimeField(auto_now_add=True)
    is_selected = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.photo.name}"

class Photo(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='photos/')

    def __str__(self):
        return self.name


       