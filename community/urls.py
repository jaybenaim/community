from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt
# from rest_framework.authtoken import views
from .views import * 
from rest_framework.authtoken import views as rest_framework_views
from django.conf import settings
from django.conf.urls.static import static

# from rest_framework_jwt.views import obtain_jwt_token

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
<<<<<<< HEAD
    path('', root),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/it/', csrf_exempt(ApiView.as_view())),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    path('home/', home),
    path('api/login', login),
    # path('core/', include('core.urls')),
=======
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    url('api-token-auth/', rest_framework_views.obtain_auth_token),
>>>>>>> ce91ffb6ac6d827ac3e84afc43a6a454c381dbb7
    url(r'^', FrontendAppView.as_view()),
]
