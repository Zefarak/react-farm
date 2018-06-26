from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from users.models import CustomUser
from .serializers import UserSerializer

class UserListView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all() 
    serializer_class = UserSerializer


class  CurrentUserApiView(APIView):
    
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data)
