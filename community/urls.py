from django.urls import path, include 
from rest_framework import routers 
from django.contrib import admin
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
<<<<<<< HEAD
# from rest_framework.authtoken import views
from .views import *
=======
from .views import * 
from .views import CustomObtainAuthToken as CustomTokenView
>>>>>>> 35557f78cad79a42599bbfc83e6198e5373f0b5f
from rest_framework.authtoken import views as rest_framework_views
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter() 
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet) 
router.register(r'profiles', ProfileViewSet) 
router.register(r'items', ItemViewSet) 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    url('api-token-auth/', rest_framework_views.obtain_auth_token),
<<<<<<< HEAD
    url(r'^', FrontendAppView.as_view()),
]
=======
      url(r'^authenticate/', CustomTokenView.as_view()),
    url(r'^', FrontendAppView.as_view()),
    ] 


>>>>>>> 35557f78cad79a42599bbfc83e6198e5373f0b5f
