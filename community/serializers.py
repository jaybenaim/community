from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import *


class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        feilds = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.Serializer):
    class Meta:
        model = Group
        feilds = ["url", "name"]


class ProfileSerializer(serializers.ModelSerializer):
    shed_items = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='shed_items'
     )
    class Meta:
        model = Profile
        fields = ["username", "profile_name", "email", "address", "shed_items"]

    def create(self, validated_data):
        return Profile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.address = validated_data.get("address", instance.address)
        instance.save(username=request.user)
        return instance


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ["name_of_item", "price"]

    def create(self, validated_data):
        return Item.objects.create(**validated_data)
