from django.urls import path, include

from .api.views import (FarmApiView, FarmApiCreate, FarmApiDetailView, FarmApiSlugDetailView,
                        CropApiView, CropApiCreate,
                        TreeApiView 
                        )
from .api.views import TestFarmApi

urlpatterns = [
    path('', FarmApiView.as_view()),

    # path('χωράφια/')



    path('<int:pk>', FarmApiDetailView.as_view()),
    path('slug/<slug:slug>', FarmApiSlugDetailView.as_view()),
    path('create', FarmApiCreate.as_view()),

    # crops
    path('crops/', CropApiView.as_view()),
    path('crops/create/', CropApiCreate.as_view()),


    path('trees/', TreeApiView.as_view()),


    # test api
    path('test/', TestFarmApi.as_view(), name='test_farm_api'),

]
