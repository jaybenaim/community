from django.contrib import admin
from django.urls import path, include 
from django.conf.urls import url
from .views import *

urlpatterns = [
    path('', root), 
    path('admin/', admin.site.urls),
    path('home/', home),
    path('accounts/signup', signup, name='signup'), 
    path('accounts/signup_create', signup_create, name='signup_create'), 
    path('accounts/profile/', include('django.contrib.auth.urls')), 
    path('api/items', api_items, name='api_items'), 
    path('api/profiles', api_profiles, name='api_profiles'), 
    url(r'^', FrontendAppView.as_view()),

]