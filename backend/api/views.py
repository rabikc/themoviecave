from rest_framework import viewsets, generics, permissions
from django.shortcuts import render
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import WatchListSerializer
from .models import WatchList


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims

        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name

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

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def getWatchlist(request):

    if request.method == 'GET':
        user = request.user
        watchlists = user.watchlist_set.all()
        serializer = WatchListSerializer(watchlists, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        user = request.user
        watchlists = user
        serializer = WatchListSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteWishlist(request, pk):
    watchlists = WatchList.objects.get(id=pk)
    watchlists.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
