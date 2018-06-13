from rest_framework import generics
from .serializers import FarmSerializer, CropSerializer, TreeSerializer
from ..models import Farm, Crop, Tree

class FarmApiView(generics.ListCreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer


class FarmApiCreate(generics.CreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer

class CropApiView(generics.ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer


class TreeApiView(generics.ListCreateAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer