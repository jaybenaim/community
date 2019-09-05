from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, reverse, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse, JsonResponse
import json 
# from .forms import *
from .models import *
from django.core import serializers


def root(request): 
    return redirect('home/')
    
def home(request): 
    context = {
        'items': Item.objects.all(), 
        'users': UserProfile.objects.all() 
    }
    return render(request, 'index.html', context)
def login_view(request):
    if request.user.is_authenticated:
        return redirect('/')
    
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            
            username = form.cleaned_data['username']
            pw = form.cleaned_data['password']
            
            user = authenticate(username=username, password=pw)
            
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('/home')
            else:
                form.add_error('username', 'Login failed')
    else:
        form = LoginForm()

    return render(request, 'login.html', {
        'form': form
    }) 


def signup(request):
    form = UserCreationForm() 
    context =  {'form': form} 
    return render(request, 'registration/signup.html', context)

def signup_create(request): 
    form = UserCreationForm(request.POST)
    if form.is_valid(): 
        new_user = form.save()
        login(request, new_user)
        return redirect('/')
    else: 
        return render(request, 'registration/signup.html', {'form': form})

def api(request): 
    items = serializers.serialize('json', Item.objects.all())
    users = serializers.serialize('json', UserProfile.objects.all())
    data = { 
        'item': items,
        'UserProfile': users
    }
 
    return JsonResponse(data)