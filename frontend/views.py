from django.shortcuts import render, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages


def homepage(request):

    return render(request, 'index.html')


def index(request):
    return render(request, 'homepage.html')


def login_view(request):
    if 'login' in request.POST:
        username = request.POST.get('username', None)
        password = request.POST.get('password', None)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect('/')
        else:
            messages.warning('The credentials is invalid!')
        
    return render(request, 'login.html')


def signup(request):
    pass

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/login')