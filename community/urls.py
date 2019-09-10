from django.urls import path, include 
from rest_framework import routers 
from django.contrib import admin
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter() 
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet) 
router.register(r'profiles', ProfileViewSet) 
router.register(r'items', ItemViewSet) 

urlpatterns = [
    path('', root), 
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/it/', csrf_exempt(ApiView.as_view())),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    path('home/', home),
    path('accounts/signup', signup, name='signup'), 
    path('accounts/signup_create', signup_create, name='signup_create'), 
    path('accounts/profile/', include('django.contrib.auth.urls')), 
    url(r'^', FrontendAppView.as_view()),


]