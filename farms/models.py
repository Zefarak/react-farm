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
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name='trees')
    is_public = models.BooleanField(default=False)

    def tag_user(self):
        return f'{self.user.username}' if self.user else 'No Creator'
    

class Farm(TimeStampTitleModel):
    date_test = models.DateField(null=True)
    active = models.BooleanField(default=True)
    area = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    slug = models.SlugField(null=True)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name='farms')
    is_public = models.BooleanField(default=False)

    def get_crops(self):
        print(self.crops.all())
        return self.crops.all().values_list('title__title', 'id', 'area', 'qty')

    def tag_active(self):
        return 'Ενεργοποιημένο' if self.active else 'Απενεργοποιημένο'

    def tag_public(self):
        return 'Δημόσιο' if self.is_public else 'Ιδιωτικό'


class Crop(TimeStampModel):
    title = models.ForeignKey(Tree, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=0)
    area = models.DecimalField(decimal_places=2, max_digits=20, default=0)
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

    def tag_farm(self):
        return f'{self.farm.title}' if self.farm else 'No Farm'
    
    
    def tag_title(self):
        return f'{self.title}'

    