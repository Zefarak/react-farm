from django.urls import path
from .api.views import CropStatDetailApiView, ExpenseCropStatApiView



urlpatterns = [
    path('reports/crops/<int:pk>/', ExpenseCropStatApiView.as_view(), name='report_expenses_crop'),
]