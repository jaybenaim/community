from django.db import models
from django.forms import ModelForm
from django.core import validators
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from datetime import date
from django import forms
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    profile_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Item(models.Model):
    name_of_item = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    profile_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    available = models.BooleanField(default=True)
    user_who_borrowed = models.ForeignKey(User, on_delete=models.CASCADE, null=True) 

    def __str__(self):
        return self.name_of_item


class Messages(models.Model): 
    text = models.TextField() 
    sending_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="sending_user") 
    recieving_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="recieving_user") 
    time = models.TimeField(auto_now_add=True) 
    def __str__(self): 
        return "Sender: {}".format(self.sending_user )

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

#  Automatically generate tokens


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# Generate key for users in database following in pyman shell
