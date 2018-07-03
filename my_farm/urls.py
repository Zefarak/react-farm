from django.urls import path, include, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from frontend.views import homepage

from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('token-auth/', obtain_jwt_token),


    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('farms.urls')),
    path('api/', include('users.urls')),
    path('api/', include('incomes.urls')),
    path('api/', include('outcomes.urls')),
    path('api/', include('reports.urls')),
    
]
