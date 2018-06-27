from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .serializers import (FarmListSerializer, FarmDetailSerializer,
                          CropSerializer, CropDetailSerializer,
                          TreeSerializer
                          )
from .serializers import TestFarmSerializer
from .permissions import IsOwnerOrReadOnly
from ..models import Farm, Crop, Tree


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'farms': reverse('farms', request=request, format=format),
        'crops': reverse('crops', request=request, format=format),
        'trees': reverse('trees', request=request, format=format),
        'invoice': reverse('invoice', request=request, format=format),
        'users': reverse('users', request=request, format=format),
        'expenses': reverse('expenses', request=request, format=format),
        'expense_cate': reverse('expense_cate', request=request, format=format),
    })


class FarmApiView(generics.ListCreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Farm.objects.filter(user=self.request.user)
        return queryset
    
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
    

class FarmApiDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmDetailSerializer
    permissions = [permissions.IsAuthenticatedOrReadOnly,]

    def get_queryset(self):
        queryset = Farm.objects.filter(user=self.request.user)
        return queryset


class CropApiView(generics.ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permissions = [permissions.IsAuthenticatedOrReadOnly, ]
    
    def get_queryset(self):
        queryset = Crop.objects.filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class CropApiDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropDetailSerializer
    permissions = [IsOwnerOrReadOnly,]


class TreeApiView(generics.ListCreateAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer


class TreeApiViewCreate(generics.CreateAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer

class TreeApiUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer


# tests

class TestFarmApi(generics.ListAPIView):
    queryset = Farm.objects.all()
    serializer_class = TestFarmSerializer