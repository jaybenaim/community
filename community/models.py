from django.db import models 
from django.forms import ModelForm 
from django.core import validators
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from datetime import date 
from django import forms 

class Item(models.Model): 
    name_of_item = models.CharField(max_length=255)
    price = models.CharField(max_length=255)
    date_lent = models.DateTimeField(auto_now_add=True)
    date_borrowed = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return self.name_of_item

class UserProfile(models.Model): 
    # name = models.CharField(max_length=255) get from request 
    email = models.EmailField(max_length=255) 
    address = models.CharField(max_length=255)
    shed_items = models.ForeignKey(Item, on_delete=models.CASCADE) 


