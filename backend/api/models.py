from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User, AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.contrib.auth import get_user_model


class UserManager(BaseUserManager):

    def create_user(self, first_name, last_name, email, username,  password=None, **kwargs):

        if not email:
            raise ValueError("Users must have an email address")

        if not username:
            raise ValueError("Users must have a username")

        if not first_name:
            raise ValueError("Users must have First Name")

        if not last_name:
            raise ValueError("Users must have a Last Name")

        email = self.normalize_email(email)

        user = self.model(username=username, **kwargs)
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.set_password(password)
        user.save()

        return user

    # def create_superuser(self, username, email,  password=None, **kwargs):

    #     kwargs.setdefault('is_active', True)
    #     kwargs.setdefault('is_staff', True)
    #     kwargs.setdefault('is_superuser', True)

    #     if kwargs.get('is_active') is not True:
    #         raise ValueError('Superuser must be active')

    #     if kwargs.get('is_staff') is not True:
    #         raise ValueError('Superuser must be staff')

    #     if kwargs.get('is_superuser') is not True:
    #         raise ValueError('Superuser must have is_superuser=True')

    #     return self.create_user(username, email, password, **kwargs)


class User(AbstractBaseUser, PermissionsMixin):

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

    def get_full_name(self):
        return f"{self.first_name}{self.last_name}"

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.username



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
    content_id = models.CharField(max_length=50)
    media_type = models.CharField(max_length=20)
    overview = models.TextField()
    genre = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=100)
    backdrop_path = models.CharField(max_length=100)
    date = models.CharField(max_length=20)
    review = models.TextField()

    class Meta:
        unique_together = (('user', 'content_id'),)    

    def __str__(self):
        return self.name


class Watched(models.Model):

    # movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    name = models.CharField(max_length=250)
    content_id = models.CharField(max_length=50)
    media_type = models.CharField(max_length=20)
    overview = models.TextField()
    # genre = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=100)
    backdrop_path = models.CharField(max_length=100)
    date = models.CharField(max_length=20)
    # vote_average = models.CharField(max_length=50)
    # review = models.TextField()

    class Meta:
        unique_together = (('user', 'content_id'),)    

    def __str__(self):
        return self.name


class Favorites(models.Model):

    # movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    name = models.CharField(max_length=250)
    content_id = models.CharField(max_length=50)
    media_type = models.CharField(max_length=20)
    overview = models.TextField()
    # genre = models.CharField(max_length=100)
    poster_path = models.CharField(max_length=100)
    backdrop_path = models.CharField(max_length=100)
    date = models.CharField(max_length=20)
    # vote_average = models.CharField(max_length=50)
    # review = models.TextField()

    class Meta:
        unique_together = (('user', 'content_id'),)    

    def __str__(self):
        return self.name


