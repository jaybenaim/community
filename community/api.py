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
  
    # def retrieve(self, request, pk=None): 
    #     user = request.user 
    #     queryset = Profile.objects.filter(user=user, pk=None) 
    #     if not queryset:  
    #         return Response(status=status.HTTP_400_BAD_REQUEST)
    #     else:
    #         serializer = YourModelSerializer(queryset)
    #         return Response(serializer.data,status=status.HTTP_200_OK)

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



class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')