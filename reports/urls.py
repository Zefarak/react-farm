from django.urls import path
from .api.views import CropStatDetailApiView



urlpatterns = [
    path('reports/crops/<int:pk>/', CropStatDetailApiView.as_view(), name='report_crops'),
]