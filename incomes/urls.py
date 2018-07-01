from django.urls import path
from .api.views import InvoiceApiView, InvoiceDetailApiView, InvoiceCategoryApiView

urlpatterns = [
    path('incomes/invoices/', InvoiceApiView.as_view(), name='incomes'),
    path('incomes/invoices-detail/<int:pk>/', InvoiceDetailApiView.as_view(), name='incomes_detail'),
    
    path('incomes/invoices-category/', InvoiceCategoryApiView.as_view(), name='invoice_category'),
]