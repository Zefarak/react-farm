from django.urls import path, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from frontend.views import homepage


urlpatterns = [
    path('', view=homepage),

    path('data/', TemplateView.as_view(template_name='index.html')),
    path('χωράφια/', TemplateView.as_view(template_name='index.html')),
    path('χωράφια/δημιουργία/', TemplateView.as_view(template_name='index.html')),
    path('καλλιέργιες/', TemplateView.as_view(template_name='index.html')),
    path('καλλιέργιες/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('καλλιέργιες/δημιουργία/', TemplateView.as_view(template_name='index.html')),

    path('δέντρα/', TemplateView.as_view(template_name='index.html')),
    path('trees/<int:id>/', TemplateView.as_view(template_name='index.html')),

    re_path(r'^farms/', TemplateView.as_view(template_name='index.html')),

    path('expenses/', TemplateView.as_view(template_name='index.html')),
    path('expenses/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('expenses-categories/', TemplateView.as_view(template_name='index.html')),
    path('expenses-categories/<int:id>/', TemplateView.as_view(template_name='index.html')),

    path('payroll/', TemplateView.as_view(template_name='index.html')),
    path('payroll/<int:id>/', TemplateView.as_view(template_name='index.html')),

    path('incomes/invoices/', TemplateView.as_view(template_name='index.html')),
    path('incomes/invoices/<int:id>/', TemplateView.as_view(template_name='index.html')),

    path('reports/', TemplateView.as_view(template_name='index.html')),
    path('reports/farms/', TemplateView.as_view(template_name='index.html')),
    path('reports/balance-sheet/', TemplateView.as_view(template_name='index.html')),


]