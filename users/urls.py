from django.urls import include, path

from .api import views

urlpatterns = [
    
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('users/current/', views.CurrentUserApiView.as_view()),

    path('current-user/', views.current_user, name='current_user'),
    path('users/', views.UserListView.as_view(), name='users'),
   

    path('user/login/', views.UserLoginApiView.as_view()),

]