from django.urls import path, include
from django.contrib import admin

from frontend.views import homepage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', view=homepage),

    path('api/farms/', include('farms.urls')),

]
