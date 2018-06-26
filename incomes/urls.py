from django.urls import path
from .api.views import InvoiceApiView, InvoiceDetailApiView

urlpatterns = [
    path('incomes/invoices/', InvoiceApiView.as_view(), name='invoice'),
    path('incomes/invoices-detail/<int:pk>/', InvoiceDetailApiView.as_view())
]