from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


from django.contrib.auth import authenticate, login
from users.models import CustomUser
from .serializers import UserSerializer, UserSerializerWithToken, UserLoginSerializer

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


class UserLoginApiView(APIView):
    permission_classes = (permissions.AllowAny, )
    serializer = UserLoginSerializer

    def get(self, request, format=None):
        snippets = CustomUser.objects.all()
        serializer = UserLoginSerializer(snippets, many=True)
        return Response(serializer.data)


    def post(self, request, *args, **kwargs):
        data = request.data
        print(data['username'], data['password'])
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            username = data['username']
            password = data['password']
            user = authenticate(request, username=username, password=password)
            print(user, 'user')
            tt = login(request, user)
            print('after login', tt)
            return Response(new_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)