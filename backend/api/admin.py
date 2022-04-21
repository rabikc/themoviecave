from django.contrib import admin

# Register your models here.

from .models import WatchList, Rating, User, Favorites, Watched

admin.site.register(WatchList)
admin.site.register(Rating)
admin.site.register(User)
admin.site.register(Favorites)
admin.site.register(Watched)
