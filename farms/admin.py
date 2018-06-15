from django.contrib import admin
from .models import Tree, Crop, Farm
# Register your models here.

admin.site.register([Farm, Crop, Tree])