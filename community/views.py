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
        'users': User.objects.all(),
        'profiles': Profile.objects.all(), 
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
    # users = User.objects.all() 
    items = Item.objects.all() 
    profiles = Profile.objects.all() 

    itemList = []
    addressList = []

    for item in items: 
        itemList.append({'name': item.name_of_item, 'price': item.price})

    for profile in profiles: 
        addressList.append({
            'id': profile.user.id, 
            'username': profile.user.username, 
            'email': profile.email, 
            'address': profile.address, 
        })


    data = {
        'items': itemList,
        'Profiles': addressList
    }
    json.dumps(data)
    response = JsonResponse(
        {
       'items': itemList,
        'Profiles': addressList
        } 
    )

    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
    return response 
    # return JsonResponse(data, safe=False)

