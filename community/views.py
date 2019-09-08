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
import logging
from django.views.generic import View
from django.conf import settings
import os
import random 

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


    
def incrementingKey(num): 
        return num + 1
    
def api(request): 
    
    newProfile = Profile()  
    newItem = Item() 


    if request.method == 'POST': 
        body = json.loads(request.body)
        newProfile.id = request.user.id
        print(body)
        newProfile.profile_name = body["username"]
        newProfile.email = body["email"]
        newProfile.address = body["address"]
        newProfile.initial_item = body["shedItem"]
        newItem.name_of_item = body["shedItem"]
        newItem.price = body['shedItemPrice']
        # newProfile.shed_items = newItem
        # newProfile.create(shed_items=body["shed_item"])
        # newProfile.shed_items.set(  {'name_of_item':body["shed_item"],  'price':"A cup of Tea"} )
        newProfile.save()
        newItem.save()

    items = Item.objects.all() 
    profiles = Profile.objects.all() 
    itemList = []
    profileList = []
    shed_items = []

    for item in items: 
        itemList.append({'name': item.name_of_item, 'price': item.price})

    for profile in profiles: 
        profileList.append({
            'user_id': request.user.id, 
            'username': request.user.username, 
            'profile_name': profile.profile_name,
            'email': profile.email, 
            'address': profile.address, 
            'initial_item': profile.initial_item,
            'shed_items': shed_items
            }
        )

    data = {
        'items': itemList,
        'Profiles': profileList
    }

    json.dumps(data)
    response = JsonResponse(
        {
        'items': itemList,
        'profiles': profileList
        } 
    )

    return response 


class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )