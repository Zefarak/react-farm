from django.urls import include, path

from .api import views

urlpatterns = [
    path('users', views.UserListView.as_view(), name='users'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('users/current/', views.CurrentUserApiView.as_view()),

]