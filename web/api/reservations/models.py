from django.db import models

# Create your models here.
class Reservation(models.Model):
    firstName = models.CharField(max_length=200, default='')
    lastName = models.CharField(max_length=200, default='')
    startTime = models.DateTimeField(default='')
    endTime = models.DateTimeField(default='')
    seats = models.SmallIntegerField(default=1)
    accept = models.BooleanField(default=False)
    deny = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
