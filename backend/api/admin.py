from django.contrib import admin

# Register your models here.

from .models import WatchList, Rating, User

admin.site.register(WatchList)
admin.site.register(Rating)
admin.site.register(User)
