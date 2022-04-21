from rest_framework import viewsets, generics, permissions
from django.shortcuts import render
from rest_framework.response import Response
from .models import Favorites, User, Watched
from .serializers import FavoritesSerializer, UserCreateSerializer, WatchedSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import WatchListSerializer, RatingSerializer
from .models import WatchList, Rating


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer

    def post(self,request):
       serializer=UserCreateSerializer(data=request.data)
       if serializer.is_valid():
           new_user=serializer.save()
           if new_user:
               r= request.post('http://127.0.0.1:8000/api-auth/token', data = {
                   'username':new_user.username,
                   'password':request.data['password'],
                   'client_id':'Your Client ID',
                   'client_secret':'Your Client Secret',
                   'grant_type':'password'
               })
               return Response(r.json(),status=status.HTTP_201_CREATED)
       return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)


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


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def ratingView(request):

    if request.method == 'GET':
        user = request.user
        ratings = user.rating_set.all()
        serializer = RatingSerializer(ratings, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        user = request.user
        ratings = user
        serializer = RatingSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def editRating(request, pk):

    if request.method == 'PUT':
        rating = Rating.objects.get(id=pk)
        serializer = RatingSerializer(rating, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
    elif request.method == 'DELETE':

        rating = Rating.objects.get(id=pk)
        rating.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def watchedView(request):

    if request.method == 'GET':
        user = request.user
        watched = user.watched_set.all()
        serializer = WatchedSerializer(watched, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        user = request.user
        watched = user
        serializer = WatchedSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def editWatched(request, pk):

    if request.method == 'PUT':
        watched = Watched.objects.get(id=pk)
        serializer = WatchedSerializer(watched, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':

        watched = Watched.objects.get(id=pk)
        watched.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def favoritesView(request):

    if request.method == 'GET':
        user = request.user
        favorite = user.favorites_set.all()
        serializer = FavoritesSerializer(favorite, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        user = request.user
        favorite = user
        serializer = FavoritesSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT','DELETE'])
@permission_classes([IsAuthenticated])
def editFavorites(request, pk):

    if request.method == 'PUT':
        favorite = Favorites.objects.get(id=pk)
        serializer = FavoritesSerializer(favorite, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
    elif request.method == 'DELETE':

        favorite = Favorites.objects.get(id=pk)
        favorite.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)