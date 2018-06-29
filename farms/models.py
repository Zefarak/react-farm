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
    

class Farm(TimeStampTitleModel):
    date_test = models.DateField(null=True)
    active = models.BooleanField(default=True)
    area = models.PositiveIntegerField(default=0)
    slug = models.SlugField(null=True)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name='farms')
    is_public = models.BooleanField(default=False)


class Crop(TimeStampModel):
    title = models.ForeignKey(Tree, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=0)
    area = models.PositiveIntegerField(default=0)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name='crops')
    farm = models.ForeignKey(Farm, null=True, on_delete=models.SET_NULL, related_name='crops')
    is_public = models.BooleanField(default=False)
    objects = models.Manager()
    
    
    def __str__(self):
        try:
            return f'{self.farm.title} - {self.title.title}' 
        except:
            return self.title.title
    
    
    def tag_name(self):
        try:
            return f'{self.farm.title} - {self.title.title}' 
        except:
            return f'{self.title.title}'