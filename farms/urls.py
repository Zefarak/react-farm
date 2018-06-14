from django.urls import path, include

from .api.views import FarmApiView, CropApiView, TreeApiView, FarmApiCreate, FarmApiDetailView, FarmApiSlugDetailView

urlpatterns = [
    path('', FarmApiView.as_view()),
    path('<int:pk>', FarmApiDetailView.as_view()),
    path('slug/<slug:slug>', FarmApiSlugDetailView.as_view()),


    path('create', FarmApiCreate.as_view()),
    path('crops/', CropApiView.as_view()),
    path('trees/', TreeApiView.as_view()),

]
