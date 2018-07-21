from rest_framework import serializers
from django.utils import timezone
from django.db.models import Sum

from ..models import Farm, Crop, Tree



class TreeSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='tree_detail')
    public = serializers.SerializerMethodField()

    class Meta:
        model = Tree
        fields = ['title', 'user', 'is_public', 'url', 'id', 'public', 'tag_user']

    def get_public(self, obj):
        return 'Κοινόχρηστο' if obj.is_public else 'Οχι κοινόχρηστο'


class CropSerializer(serializers.ModelSerializer):
    #title = serializers.SlugRelatedField(slug_field='title', queryset=Tree.objects.all())
    url = serializers.HyperlinkedIdentityField(view_name='crop_detail', format='html')
    report_url = serializers.HyperlinkedIdentityField(view_name='report_expenses_crop', format='html')
    crop_slug = serializers.ReadOnlyField(source='title.title')

    class Meta:
        model = Crop
        fields = ['crop_slug', 'title', 'area', 'qty', 'farm', 'user',
                  'is_public', 'url', 'id', 'tag_name', 'tag_farm', 
                  'tag_title', 'report_url'
                  ]



class CropDetailSerializer(serializers.ModelSerializer):
    # title = serializers.SlugRelatedField(slug_field='title', queryset=Tree.objects.all())
    farm = serializers.SlugRelatedField(slug_field='title', queryset=Farm.objects.all())
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Crop
        fields = ['title', 'area', 'qty', 'farm', 'user', 'is_public', 'tag_title', 'tag_farm']

    def get_fields(self, *args, **kwargs):
       fields = super(CropDetailSerializer, self).get_fields(*args, **kwargs)
       fields['farm'].queryset = Farm.objects.filter(user=self.context['view'].request.user)
       return fields


class CropStatsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crop
        fields =[]

    

# tests

class TestFarmSerializer(serializers.ModelSerializer):
    crops = serializers.StringRelatedField(many=True)

    class Meta:
        model = Farm
        fields = ['title', 'area', 'user', 'crops']


    def get_crops(self, obj):
        return obj.crops.all()

    
class FarmListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='farm_detail', format='html')

    class Meta:
        model = Farm
        fields = ['title', 'id', 'area', 'crops', 'url', 'is_public', 'active', 'tag_active', 'tag_public']
        

class CropSer(serializers.ModelSerializer):

    class Meta:
        model = Crop
        fields = ['title', 'id', 'qty', 'area', 'tag_title']


class FarmDetailSerializer(serializers.ModelSerializer):
    crops_related = serializers.SerializerMethodField()
    report = serializers.SerializerMethodField()

    class Meta:
        model = Farm
        fields = ['title', 'id', 'area', 'crops',
                  'is_public', 'active', 'crops_related',
                  'report', 'tag_active', 'tag_public'
                  ]

    def get_crops_related(self, obj):
        queryset = Crop.objects.filter(farm=obj)
        serializer=  CropSer(queryset, many=True)
        return serializer.data

    def get_report(self, obj):
        queryset = Crop.objects.filter(farm=obj)
        data = {}
        totals = queryset.values('farm').annotate(total_qty=Sum('qty'),
                                                  total_area=Sum('area'),

                                                 ).order_by('farm')
        data['trees'] = totals[0]['total_qty'] if totals else 0
        data['area'] = totals[0]['total_area'] if totals else 0 
        return data
        

