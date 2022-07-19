from django.db import models
from datetime import date

# Create your models here.


class Board(models.Model):
    _id = models.AutoField(primary_key=True, serialize=True)
    writer = models.ForeignKey('User', on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    content = models.CharField(max_length=5000)
    imgPath = models.CharField(max_length=500, blank=True)
    createdAt = models.DateField(default=date.today)
    user_id = models.CharField(max_length=500, blank=True)
    user_pwd = models.CharField(max_length=500, blank=True)
    qtitle = models.CharField(max_length=500, blank=True)
    qcontent = models.CharField(max_length=5000, blank=True)
    qtag = models.CharField(max_length=500, blank=True)
    stackoverflow = models.CharField(max_length=500, blank=True)
    serverfault = models.CharField(max_length=500, blank=True)
    superuser = models.CharField(max_length=500, blank=True)
    askubuntu = models.CharField(max_length=500, blank=True)
    askdifferent = models.CharField(max_length=500, blank=True)


class User(models.Model):
    _id = models.AutoField(primary_key=True, serialize=True)
    email = models.CharField(max_length=500, unique=True)
    name = models.CharField(max_length=500)
    password = models.CharField(max_length=500)
    createdAt = models.DateField(default=date.today)
    loginCnt = models.IntegerField(default=0)
    lookYn = models.BooleanField(default=False)
