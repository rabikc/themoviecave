from unicodedata import name
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from . import views
from .views import UserViewSet, MyTokenObtainPairView
# from .views import RegisterAPI

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register('users', UserViewSet)
# router.register('watchlists', WatchlistViewSet)
# router.register('token', MyTokenObtainPairView)
# router.register('token/refresh', TokenRefreshView)

urlpatterns = [
    path('', include(router.urls)),
    path('watchlists/', views.getWatchlist,name='Watchlists'),
    path('watchlists/<str:pk>/', views.deleteWishlist,name='Watchlist'),
    path('rated/', views.ratingView,name='Ratings'),
    path('rated/<str:pk>/', views.editRating,name='Rating'),
    # path('users/', views.as_view(), name= ),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# include(router.urls)
