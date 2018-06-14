from rest_framework import serializers
from ..models import Farm, Crop, Tree

class FarmSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farm
        fields = '__all__'



class CropSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crop
        fields = "__all__"


class TreeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tree
        fields = "__all__"