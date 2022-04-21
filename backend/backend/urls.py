from re import template
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from django.conf.urls import include
from .views import index
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/', include('djoser.urls')),
    re_path('api-auth/', include('drf_social_oauth2.urls', namespace='drf')),
    # path('api-auth/', include('rest_framework.urls')),
    # path('api-auth/', include('drf_social_oauth2.urls',namespace='drf')),
    # path('api/', include('djoser.social.urls')),
]

urlpatterns += [re_path(r'^.*',csrf_exempt(TemplateView.as_view(template_name = 'index.html')))]

