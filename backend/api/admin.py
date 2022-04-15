from django.contrib import admin

# Register your models here.

from .models import WatchList, Rating

admin.site.register(WatchList)
admin.site.register(Rating)
