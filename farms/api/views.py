from rest_framework import generics
from .serializers import FarmSerializer, CropSerializer, CropCreateSerializer, TreeSerializer, FarmDetailSerializer
from .serializers import TestFarmSerializer
from ..models import Farm, Crop, Tree


class FarmApiView(generics.ListCreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer


class FarmApiCreate(generics.CreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer


class FarmApiDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmDetailSerializer


class FarmApiSlugDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmDetailSerializer
    lookup_field = 'slug'



class CropApiView(generics.ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer


class CropApiCreate(generics.CreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropCreateSerializer


class TreeApiView(generics.ListCreateAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer





# tests

class TestFarmApi(generics.ListAPIView):
    queryset = Farm.objects.all()
    serializer_class = TestFarmSerializer