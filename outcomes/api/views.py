from rest_framework import generics, permissions, pagination
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum
from .serializers import ExpenseListSerializer, ExpenseDetailSerializer, ExpenseCategorySerializer
from ..models import Expense, ExpenseCategory, Payroll, PayrollCategory
from .permissions import IsOwnerOrReadOnly


class ExpensePagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        user = self
        context = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'results': data,

        }
        return Response(context)


class ExpenseCategoryListApi(generics.ListCreateAPIView):
    serializer_class = ExpenseCategorySerializer
    queryset = ExpenseCategory.objects.all()
    permission_classes = (permissions.IsAuthenticated,)


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
    pagination_class = (ExpensePagination)

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
    permission_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class ExpenseGenericApiView(generics.ListAPIView):
    serializer_class = ExpenseListSerializer
    permission_classes = (permissions.IsAuthenticated, )
    pagination_class = (ExpensePagination)

    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)
        return queryset

    def get(self, request, *args, **kwargs):
        data = {}
        queryset = Expense.objects.filter(user=self.request.user)
        data['total_value'] = queryset.aggregate(Sum('final_value'))['final_value__sum'] if queryset else 0
        return Response(data)

    