from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.

class WatchList(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE, null = True)
    name = models.CharField(max_length=250)
    content_id = models.CharField(max_length=250)
    media_type = models.CharField(max_length=250)
    overview = models.TextField()
    poster_path = models.CharField(max_length=250)
    backdrop_path = models.CharField(max_length=250)
    vote_average = models.CharField(max_length=50)

    class Meta:
        unique_together = (('user', 'content_id'),)

    def __str__(self):
        return self.name

class Rating(models.Model):

    # movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    name = models.CharField(max_length=250)
    content_id = models.CharField(max_length=250)
    media_type = models.CharField(max_length=250)
    overview = models.TextField()
    poster_path = models.CharField(max_length=250)
    backdrop_path = models.CharField(max_length=250)

    def __str__(self):
        return self.name
