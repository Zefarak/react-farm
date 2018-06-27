from django.urls import path, include, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from frontend.views import homepage

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', view=homepage),

    path('χωράφια/', TemplateView.as_view(template_name='index.html')),
    path('χωράφια/δημιουργία/', TemplateView.as_view(template_name='index.html')),
    path('καλλιέργιες/', TemplateView.as_view(template_name='index.html')),
    path('καλλιέργιες/δημιουργία/', TemplateView.as_view(template_name='index.html')),

    path('δέντρα/', TemplateView.as_view(template_name='index.html')),
    path('trees/<int:id>/', TemplateView.as_view(template_name='index.html')),

    
    re_path(r'^farms/', TemplateView.as_view(template_name='index.html')),

    
    path('expenses/', TemplateView.as_view(template_name='index.html')),
    

    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('farms.urls')),
    path('api/', include('users.urls')),
    path('api/', include('incomes.urls')),
    path('api/', include('outcomes.urls')),
    
]
