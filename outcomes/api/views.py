from rest_framework import generics, permissions, pagination
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum
from .serializers import (ExpenseListSerializer, ExpenseDetailSerializer, ExpenseCategorySerializer,
                          PayrollSerializer, PayrollCategorySerializer)
from ..models import Expense, ExpenseCategory, Payroll, PayrollCategory
from .permissions import IsOwnerOrReadOnly



class CostumPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        context = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            #'count': self.page.paginator.count,
            'results': data,
        }
        return Response(context)


class ExpenseCategoryListApi(generics.ListAPIView):
    serializer_class = ExpenseCategorySerializer
    queryset = ExpenseCategory.objects.all()
    

class ExpenseCategoryDetailApi(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseCategorySerializer
    queryset = ExpenseCategory.objects.all()
    permission_classes = [permissions.IsAuthenticated,]

   
class ExpenseListApi(generics.ListCreateAPIView):
    serializer_class = ExpenseListSerializer
    permission_classes = (permissions.IsAuthenticated, )
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('category', 'crop_related')
    search_fields = ('title',)
    ordering_fields = ('timestamp', 'category')
    pagination_class = (CostumPagination, )

    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    '''
    def get(self, request, *args, **kwargs):
        serializer_context = {
            'request': request,
        }
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, context=serializer_context, many=True)
        data ={}
        data['results'] = serializer.data
        data['chritos'] = 'boom'
        return Response(data)
    '''


class ExpenseDetailApi(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseDetailSerializer
    queryset = Expense.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    
class ExpenseGenericApiView(generics.ListAPIView):
    serializer_class = ExpenseListSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = (CostumPagination)

    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)
        return queryset

    def get(self, request, *args, **kwargs):
        data = {}
        queryset = Expense.objects.filter(user=self.request.user)
        data['total_value'] = queryset.aggregate(Sum('final_value'))['final_value__sum'] if queryset else 0
        return Response(data)

    
class PayrollListApiView(generics.ListCreateAPIView):
    serializer_class = PayrollSerializer
    pagination_class = (CostumPagination)

    def get_queryset(self):
        queryset = Payroll.objects.filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class PayrollDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PayrollSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        queryset = Payroll.objects.filter(user=self.request.user)
        return queryset


class PayrollCategoryListApiView(generics.ListCreateAPIView):
    serializer_class = PayrollCategorySerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        queryset = PayrollCategory.objects.filter(is_public=True)
        queryset_1 = PayrollCategory.objects.filter(user=self.request.user)
        new_queryset = queryset | queryset_1
        return new_queryset.distinct()

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class PayrollCategoryDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PayrollCategorySerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return PayrollCategory.objects.filter(user=self.request.user)