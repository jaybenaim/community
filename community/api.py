from .models import * 
from rest_framework import viewsets
from .serializers import * 
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt

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


from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

for user in User.objects.all():
    Token.objects.get_or_create(user=user)
