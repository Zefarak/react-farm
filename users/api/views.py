from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from users.models import CustomUser
from .serializers import UserSerializer, UserSerializerWithToken

class UserListView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class  CurrentUserApiView(APIView):
    
    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        print(serializer.data)
        return Response(serializer.data)


@api_view(['GET'])
def current_user(request):

    serializer = UserSerializer(request.user)
    return Response(serializer.data)


