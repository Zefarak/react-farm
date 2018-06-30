from rest_framework import serializers
from farms.models import Crop
from outcomes.models import Expense


class CropStatDetailApiSerializer(serializers.Serializer):
    
    class Meta:
        model = Crop
        fields = ['title', 'qty']