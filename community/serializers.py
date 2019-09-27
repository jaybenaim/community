from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'password')

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        feilds = ["url", "name"]

class ProfileSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Profile
        fields = ["id", "user", "username", "profile_name", "email", "address"]

    def create(self, validated_data):
        return Profile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.profile_name = validated_data.get("profile_name", instance.profile_name)
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.address = validated_data.get("address", instance.address)
        instance.save(username=request.user)

        return instance


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["id", "profile_id", "name_of_item", "price", "available", "user_who_borrowed"]

    def create(self, validated_data):
        return Item.objects.create(**validated_data)

    def update(self, instance, validated_data): 
        instance.name_of_item = validated_data.get("name_of_item", instance.name_of_item)
        instance.price = validated_data.get("price", instance.price)
        instance.profile_id = validated_data.get("profile_id", 12)
        instance.available = validated_data.get("available", instance.available) 
        instance.user_who_borrowed = validated_data.get("user_who_borrowed", instance.user_who_borrowed) 

        instance.save()
        return instance 