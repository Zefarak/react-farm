from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (FarmListSerializer, FarmDetailSerializer,
                          CropSerializer, CropDetailSerializer,
                          TreeSerializer
                          )
from .serializers import TestFarmSerializer
from .permissions import IsOwnerOrReadOnly
from ..models import Farm, Crop, Tree

from itertools import chain


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('users', request=request, format=format),
        'current_user': reverse('current_user', request=request, format=format),

        'farms': reverse('farms', request=request, format=format),
        'crops': reverse('crops', request=request, format=format),
        'trees': reverse('trees', request=request, format=format),

        'expenses': reverse('expenses', request=request, format=format),
        'expense_cate': reverse('expense_cate', request=request, format=format),
        'payrolls': reverse('payroll', request=request, format=format),
        'payrolls_categories': reverse('payroll_cate', request=request, format=format),
        'incomes': reverse('incomes', request=request, format=format),
        'incomes_cate': reverse('invoice_category', request=request, format=format),
        'reports': reverse('report_api', request=request, format=format),
        
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
    permissions = [permissions.IsAuthenticatedOrReadOnly, ]

    def get_queryset(self):
        queryset = Farm.objects.filter(user=self.request.user)
        return queryset


class CropApiView(generics.ListCreateAPIView):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    permissions = [permissions.IsAuthenticatedOrReadOnly,]
    filter_backends = (DjangoFilterBackend, SearchFilter,)
    filter_fields = ('title', 'farm', 'is_public')
    search_fields = ['title__title', 'farm__title']
    
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
    serializer_class = TreeSerializer

    def get_queryset(self):
        queryset = Tree.objects.filter(is_public=True)
        if self.request.user.is_authenticated:
            new_query = queryset | Tree.objects.filter(user=self.request.user)
            # new_query = list(chain(queryset, Tree.objects.filter(user=self.request.user).distinct()))
            new_query = new_query.distinct()
            return new_query
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)



class TreeApiViewCreate(generics.CreateAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer



class TreeApiUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tree.objects.all()
    serializer_class = TreeSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        queryset = Tree.objects.filter(user=self.request.user)
        return queryset


# tests

class TestFarmApi(generics.ListAPIView):
    queryset = Farm.objects.all()
    serializer_class = TestFarmSerializer