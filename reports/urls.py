from django.urls import path
from .api.views import CropStatDetailApiView,\
    ExpenseCropStatApiView, IncomesReportApiView, FarmReportApiView,\
    report_api, CropReportApiView

urlpatterns = [
    path('reports/home/', report_api, name='report_api'),
    path('reports/crops/<int:pk>/', ExpenseCropStatApiView.as_view(), name='report_expenses_crop'),
    path('reports/incomes/', IncomesReportApiView.as_view(), name='report_incomes'),
    path('reports/farms/', FarmReportApiView.as_view(), name='report_farms'),
    path('reports/crops/', CropReportApiView.as_view(), name='report_crops'),
]