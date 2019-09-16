from django.shortcuts import render, reverse, redirect, get_object_or_404
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Group 
from django.http import HttpResponse, JsonResponse
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from django.views.generic import View
from rest_framework import viewsets
from django.core import serializers
from django.conf import settings
from .serializers import *
from .models import *
import logging
import random 
import json 
import os 
from .api import * 




# @csrf_exempt
# @api_view(["POST"])
# @permission_classes((AllowAny,))
# def login(request):
#     username = request.data.get("username")
#     password = request.data.get("password")
#     if username is None or password is None:
#         return Response({'error': 'Please provide both username and password'},
#                         status=HTTP_400_BAD_REQUEST)
#     user = authenticate(username=username, password=password)
#     if not user:
#         return Response({'error': 'Invalid Credentials'},
#                         status=HTTP_404_NOT_FOUND)
#     token, _ = Token.objects.get_or_create(user=user)
#     return Response({'token': token.key},
#                     status=HTTP_200_OK)


# def root(request): 
#     return redirect('home/')
    
# def home(request): 
#     context = {
#         'items': Item.objects.all(), 
#         'users': User.objects.all(),
#         'profiles': Profile.objects.all(), 
#     }
#     return render(request, 'index.html', context)

# def login_view(request):
#     if request.user.is_authenticated:
#         return redirect('/')
    
#     if request.method == 'POST':
#         form = LoginForm(request.POST)
#         if form.is_valid():
            
#             username = form.cleaned_data['username']
#             pw = form.cleaned_data['password']
            
#             user = authenticate(username=username, password=pw)
            
#             if user is not None:
#                 login(request, user)
#                 return HttpResponseRedirect('/home')
#             else:
#                 form.add_error('username', 'Login failed')
#     else:
#         form = LoginForm()

#     return render(request, 'login.html', {
#         'form': form
#     }) 


# def signup(request):
#     form = UserCreationForm() 
#     context =  {'form': form} 
#     return render(request, 'registration/signup.html', context)

# def signup_create(request): 
#     form = UserCreationForm(request.POST)
#     if form.is_valid(): 
#         new_user = form.save()
#         login(request, new_user)
#         return redirect('/')
#     else: 
#         return render(request, 'registration/signup.html', {'form': form})

    
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

