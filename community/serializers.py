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

class ProfileSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Profile 
        fields = ['username', 'profile_name', 'email', 'address']

    def create(self, validated_data): 
        return Profile.objects.create(**validated_data)

    def update(self, instance, validated_data): 
        instance.email = validated_data.get('email', instance.email)
        instance.address = validated_data.get('address', instance.address) 
        instance.save(username=request.user) 
        return instance 


class ItemSerializer(serializers.Serializer): 
    class Meta: 
        model = Item 
        fields = ['name_of_item', 'price']

