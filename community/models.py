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

class Item(models.Model): 
    name_of_item = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    date_lent = models.DateTimeField(auto_now_add=True)
    date_borrowed = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return self.name_of_item

class Profile(models.Model): 
    # user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=255)
    profile_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255) 
    address = models.CharField(max_length=255)
    initial_item = models.CharField(max_length=255)
    shed_items = models.ManyToManyField(Item) 

    def __str__(self): 
        return self.username

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()