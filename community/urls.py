from django.urls import path, include 
from rest_framework import routers 
from django.contrib import admin
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter() 
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet) 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/it/', csrf_exempt(views.ApiView.as_view())),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    # Put the API and admin routes about so they don't get eaten by the matcher?
    # must be catch-all for pushState to work
    url(r'^', views.FrontendAppView.as_view()),
    # path('', root), 
    # path('admin/', admin.site.urls),
    # path('home/', home),
    # path('accounts/signup', signup, name='signup'), 
    # path('accounts/signup_create', signup_create, name='signup_create'), 
    # path('accounts/profile/', include('django.contrib.auth.urls')), 
    # path('api/items', api_items, name='api_items'), 
    # path('api/profiles', api_profiles, name='api_profiles'), 
    # path('api/profiles/add_items', api_profiles_add_items, name='api_profiles_add_items'), 
    
    # path('', include(router.urls)),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^', views.FrontendAppView.as_view()),


]