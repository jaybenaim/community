from .models import * 
from rest_framework import viewsets
from .serializers import * 
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

class ProfileViewSet(viewsets.ModelViewSet): 
    """ Api endpoint for profiles to be viewed or edited """ 
    queryset = Profile.objects.all() 
    serializer_class = ProfileSerializer 

class ItemViewSet(viewsets.ModelViewSet): 
    """ Api endpoint for items to be viewed or edited """ 
    queryset = Item.objects.all() 
    serializer_class = ItemSerializer 


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

class TokenView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        content = {
            'user': unicode(request.user),  # `django.contrib.auth.User` instance.
            'auth': unicode(request.auth),  # None
        }
        return Response(content)