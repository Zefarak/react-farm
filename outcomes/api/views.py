from rest_framework import generics, permissions
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ExpenseListSerializer, ExpenseDetailSerializer, ExpenseCategorySerializer
from ..models import Expense, ExpenseCategory, Payroll, PayrollCategory
from .permissions import IsOwnerOrReadOnly


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

    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)
        return queryset

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)


class ExpenseDetailApi(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseDetailSerializer
    queryset = Expense.objects.all()
    permission_classes = (IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
