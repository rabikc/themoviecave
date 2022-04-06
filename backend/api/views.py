from rest_framework import viewsets, generics, permissions
from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import WatchListSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims

        token['username'] = user.username
        # token['id'] = user.id
        # token['first_name'] = user.firstName
        # token['last_name'] = user.lastName

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# @api_view(['GET'])
# def getRoutes(request):
#     routes = [
#         '/api/token',
#         '/api/token/refresh'
#     ]
#     return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])

def getWatchlist(request):
    user = request.user
    watchlists = user.watchlist_set.all()
    serializer = WatchListSerializer(watchlists, many = True)
    return Response(serializer.data)

