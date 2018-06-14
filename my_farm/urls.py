from django.urls import path, include, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from frontend.views import homepage

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', view=homepage),
    re_path(r'^farms/', TemplateView.as_view(template_name='index.html')),


    path('api/farms/', include('farms.urls')),

]
