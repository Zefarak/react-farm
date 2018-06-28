from django.urls import path
from .api.views import ExpenseListApi, ExpenseDetailApi,ExpenseGenericApiView, ExpenseCategoryListApi, ExpenseCategoryDetailApi


urlpatterns = [
    path('expenses/', ExpenseListApi.as_view(), name='expenses'),
    path('stats/expenses/', ExpenseGenericApiView.as_view(), name='expensesi'),
    path('expenses/<int:pk>/', ExpenseDetailApi.as_view(), name='expense_detail'),
    path('expense/category/', ExpenseCategoryListApi.as_view(), name='expense_cate'),
    path('expense/category/<int:pk>/', ExpenseCategoryDetailApi.as_view(), name='expense_cate_detail'),
]