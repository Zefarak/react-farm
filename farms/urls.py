from django.urls import path, include

from .api.views import FarmApiView, CropApiView, TreeApiView, FarmApiCreate

urlpatterns = [
    path('', FarmApiView.as_view()),
    path('create', FarmApiCreate.as_view()),
    path('crops/', CropApiView.as_view()),
    path('trees/', TreeApiView.as_view()),

]
