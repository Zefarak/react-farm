from rest_framework import serializers
from django.utils import timezone
from ..models import Farm, Crop, Tree


class FarmSerializer(serializers.ModelSerializer):

    class Meta:
        model = Farm
        fields = '__all__'



class TreeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Tree
        fields = "__all__"


class CropSerializer(serializers.ModelSerializer):
    title = serializers.StringRelatedField()
    
    class Meta:
        model = Crop
        fields = ['title', 'area', 'qty']

class CropCreateSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Crop
        fields = '__all__'


class FarmDetailSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)
    date_test = serializers.DateField(default=timezone.now())
    crops = CropSerializer(read_only=True, many=True)
    

    class Meta:
        model = Farm
        fields = ['id', 'slug', 'title', 'area', 'user', 'crops', 'owner', 'timestamp', 'edited', 'date_test',]

    def get_owner(self, obj):
        print('owner')
        request = self.context['request']
        if request.user.is_authenticated:
            if obj.user == request.user:
                return True
        return False


# tests

class TestFarmSerializer(serializers.ModelSerializer):
    crops = serializers.StringRelatedField(many=True)

    class Meta:
        model = Farm
        fields = ['title', 'area', 'user', 'crops']


    def get_crops(self, obj):
        print('hey babe')
        return obj.crops.all()

    