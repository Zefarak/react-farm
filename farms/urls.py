from django.urls import path, include

from .api.views import (FarmApiView, FarmApiDetailView,
                        CropApiView, CropApiDetailView,
                        TreeApiView, TreeApiViewCreate, TreeApiUpdateView,
                        api_root
                        )
from .api.views import TestFarmApi

urlpatterns = [
    

    # path('χωράφια/')
    path('',  api_root),
    
    path('farms/', FarmApiView.as_view(), name='farms'),
    path('farms/<int:pk>/', FarmApiDetailView.as_view(), name='farm_detail'),

    # crops
    path('crops/', CropApiView.as_view(), name='crops'),
    path('crops/<int:pk>/', CropApiDetailView.as_view(), name='crop_detail'),


    path('trees/', TreeApiView.as_view(), name='trees'),
    path('trees/create/', TreeApiViewCreate.as_view()),
    path('trees/<int:pk>/', TreeApiUpdateView.as_view(), name='tree_detail'),


    # test api
    path('test/', TestFarmApi.as_view(), name='test_farm_api'),

]
