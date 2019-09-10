from django.contrib.auth.models import User, Group 
from rest_framework import serializers 
from .models import * 


class UserSerializer(serializers.Serializer): 
    class Meta: 
        model = User 
        feilds = ['url', 'username', 'email', 'groups']
        
class GroupSerializer(serializers.Serializer): 
    class Meta: 
        model = Group 
        feilds = ['url', 'name']

class ProfileSerializer(serializers.Serializer): 
    class Meta: 
        model = Profile 
        fields = ['username', 'profile_name', 'email', 'address', 'shed_items']

class ItemSerializer(serializers.Serializer): 
    class Meta: 
        model = Item 
        fields = ['name_of_item', 'price']

