from django.urls import path
from .api.views import CropStatDetailApiView, ExpenseCropStatApiView, IncomesReportApiView



urlpatterns = [
    path('reports/crops/<int:pk>/', ExpenseCropStatApiView.as_view(), name='report_expenses_crop'),
    path('reports/incomes/', IncomesReportApiView.as_view(), name='report_incomes'),
]