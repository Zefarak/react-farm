from django.db import models
from users.models import CustomUser
# Create your models here.


class TimeStampModel(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class TimeStampTitleModel(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)
    title = models.CharField(unique=True, max_length=150)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title


class Tree(TimeStampTitleModel):
    description = models.TextField(blank=True)
    

class Crop(TimeStampModel):
    title = models.ForeignKey(Tree, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=0)
    area = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title.title
    

class Farm(TimeStampTitleModel):
    date_test = models.DateField(null=True)
    active = models.BooleanField(default=True)
    #user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=True, null=True)
    area = models.PositiveIntegerField(default=0)
    slug = models.SlugField(null=True)
    crops = models.ManyToManyField(Crop)


