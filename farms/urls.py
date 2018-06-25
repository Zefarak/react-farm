from django.urls import path, include

from .api.views import (FarmApiView, FarmApiCreate, FarmApiDetailView, FarmApiSlugDetailView,
                        CropApiView, CropApiCreate,
                        TreeApiView, TreeApiViewCreate, TreeApiUpdateView
                        )
from .api.views import TestFarmApi

urlpatterns = [
    path('farms/', FarmApiView.as_view()),

    # path('χωράφια/')



    path('farms/<int:pk>', FarmApiDetailView.as_view()),
    path('farms/slug/<slug:slug>', FarmApiSlugDetailView.as_view()),
    path('farms/create', FarmApiCreate.as_view()),

    # crops
    path('crops/', CropApiView.as_view()),
    path('crops/create/', CropApiCreate.as_view()),


    path('trees/', TreeApiView.as_view()),
    path('trees/create/', TreeApiViewCreate.as_view()),
    path('trees/<int:pk>/', TreeApiUpdateView.as_view()),


    # test api
    path('test/', TestFarmApi.as_view(), name='test_farm_api'),

]
