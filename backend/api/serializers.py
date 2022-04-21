from dataclasses import fields
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator
from djoser.serializers import UserCreateSerializer
from django.contrib.auth.models import User
from .models import WatchList, Rating, Watched, Favorites
from django.contrib.auth import get_user_model

User = get_user_model()


#User Serializer

class UserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'first_name', 'last_name', 'username', 'email', 'password')
    
    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     return user

# class UserCreateSerializer(serializers.ModelSerializer):

#     email = serializers.EmailField(
#             required=True,
#             validators=[UniqueValidator(queryset=User.objects.all())]
#             )
#     username = serializers.CharField(
#             required=True,
#             validators=[UniqueValidator(queryset=User.objects.all())]
#             )
#     password = serializers.CharField(min_length=8)

    # def create(self, validated_data):
    #     user = User.objects.create_user(validated_data['username'], validated_data['email'],
    #          validated_data['password'])
    #     return user

    # class Meta:
    #     model = User
    #     fields = ['id','first_name','last_name','username', 'email', 'password']
    #     extra_kwargs = {'password': {'write_only': True, 'required': True},
    #     'first_name': {'required': True},'last_name': {'required': True},
    #     'email': {'required': True}}
        
    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     return user



# Wathilist Serializer

class WatchListSerializer(ModelSerializer):

    # name = serializers.CharField(
    #         required=True,
    #         validators=[UniqueValidator(queryset=WatchList.objects.all())]
    #         )
    # content_id = serializers.CharField(
    #         required=True,
    #         validators=[UniqueValidator(queryset=WatchList.objects.all())]
    #         )

    class Meta:
        model = WatchList
        fields = '__all__'


class RatingSerializer(ModelSerializer):

    class Meta:
        model = Rating
        fields = '__all__'

class WatchedSerializer(ModelSerializer):

    class Meta:
        model = Watched
        fields = '__all__'

class FavoritesSerializer(ModelSerializer):

    class Meta:
        model = Favorites
        fields = '__all__'