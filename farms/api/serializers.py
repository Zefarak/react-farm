from rest_framework import serializers
from django.utils import timezone
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


class FarmDetailSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)
    date_test = serializers.DateField(default=timezone.now())

    class Meta:
        model = Farm
        fields = ['id', 'slug', 'title', 'area', 'user', 'crops', 'owner', 'date_test']


    def get_owner(self, obj):
        request = self.context['request']
        if request.user.is_authenticated:
            if obj.user == request.user:
                return True
        return False
