from .serializers import UserSerializer, GroupSerializer
from django.shortcuts import render, reverse, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Group 
from django.http import HttpResponse, JsonResponse
from django.views.generic import View
from rest_framework import viewsets
from django.core import serializers
from django.conf import settings
from .models import *
import logging
import random 
import json 
import os

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

    
def api_items(request): 
    newItem = Item() 
    if request.method == 'POST': 
        body = json.loads(request.body)
        newItem.name_of_item = body["shedItem"]
        newItem.price = body['shedItemPrice']
        newItem.save()

    items = Item.objects.all() 
    itemList = []

    for item in items: 
        itemList.append({'name': item.name_of_item, 'price': item.price})
   
    data = {
        'items': itemList,
    }

    json.dumps(data)
    response = JsonResponse(
        {
        'items': itemList,
        } 
    )

    return response 


def api_profiles(request): 
    newProfile = Profile()  
    newItem = Item() 
    
    if request.method == 'POST': 
        body = json.loads(request.body)
        newProfile.id = request.user.id
        newProfile.profile_name = body["username"]
        newProfile.email = body["email"]
        newProfile.address = body["address"]
        newProfile.initial_item = body["shedItem"]
        newProfile.initial_item_price = body["shedItemPrice"]
        newItem.name_of_item = body["shedItem"]
        newItem.price = body['shedItemPrice']
        newItem.save()

        # newProfile.shed_items = newItem
        # newProfile.create(shed_items=body["shed_item"])
        # newProfile.shed_items.set(  {'name_of_item':body["shed_item"],  'price':"A cup of Tea"} )
        newProfile.save()
        
    profiles = Profile.objects.all() 
    items = Item.objects.all() 
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
            'initial_item_price': profile.initial_item_price, 
            'shed_items': shed_items
            }
        )
    data = {
        'Profiles': profileList, 

    }
    json.dumps(data)
    response = JsonResponse(
        {
        'profiles': profileList, 
        } 
    )

    return response 

def api_profiles_add_items(request): 
 
    if request.method == 'POST': 
        item = Item() 
        arr = [] 
        body = json.loads(request.body)
        item.name_of_item = body['shedItem']
        item.price = body['shedItemPrice']
        profile = Profile.objects.filter(profile_name=body['user']).first()
        item = Item.objects.filter(name_of_item=body['shedItem']).first() 
        # profile.shed_items = 
        # profile.shed_items = arr

    return profile 



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

class UserViewSet(viewsets.ModelViewSet): 
    """ API endpoint that allows users to be viewed or edited """ 
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer 

class GroupViewSet(viewsets.ModelViewSet): 
    """ API endpoint that allows groups to be viewed or edited """ 
    queryset = Group.objects.all() 
    serializer_class = GroupSerializer 

class ApiView(View):
    
    def get(self, request):
        return JsonResponse({
            "it": "getting"
        })

    @csrf_exempt
    def post(self, request):
        return JsonResponse({
            "it": "posting"
        })