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

# router = routers.DefaultRouter()
# router.register('users', UserViewSet)

urlpatterns = [
    path('', views.getRoutes),
    path('watchlists/', views.getWatchlist),
    # path('users/', include('users.urls', name='users')),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

# include(router.urls)
