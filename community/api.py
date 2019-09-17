from .models import * 
from rest_framework import viewsets, permissions
from .serializers import * 

class ProfileViewSet(viewsets.ModelViewSet): 
    """ Api endpoint for profiles to be viewed or edited """ 
    queryset = Profile.objects.all().order_by('id')
    serializer_class = ProfileSerializer 
    permission_classes = [permissions.AllowAny, permissions.IsAuthenticated]

#  get permissions  if request method is get allow any 
    def get_permissions(self): 
        if self.request.method == 'GET': 
            self.permission_classes = (permissions.AllowAny,)
        return super(ProfileViewSet, self).get_permissions() 
        if self.request.method == 'POST':
            self.permission_classes = (permissions.AllowAny,)
        return super(ProfileViewSet, self).get_permissions()



class ItemViewSet(viewsets.ModelViewSet): 
    """ Api endpoint for items to be viewed or edited """ 
    queryset = Item.objects.all().order_by('id')[:6]
    serializer_class = ItemSerializer
    permission_classes = [permissions.AllowAny, permissions.IsAuthenticated]

    def get_permissions(self): 
        if self.request.method == 'GET': 
            self.permission_classes = (permissions.AllowAny,)
        return super(ItemViewSet, self).get_permissions() 

class UserViewSet(viewsets.ModelViewSet): 
    """ API endpoint that allows users to be viewed or edited """ 
    queryset = User.objects.filter()
    serializer_class = UserSerializer 
    permission_classes = [permissions.AllowAny, permissions.IsAuthenticated]

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = (permissions.AllowAny,)
        return super(UserViewSet, self).get_permissions()

    # def get_permissions(self):
    #     if self.request.method == 'POST':
    #         self.permissions_classes = (permissions.AllowAny,)
    #     return super(UserViewSet, self).get_permissions()



class GroupViewSet(viewsets.ModelViewSet): 
    """ API endpoint that allows groups to be viewed or edited """ 
    queryset = Group.objects.all() 
    serializer_class = GroupSerializer 