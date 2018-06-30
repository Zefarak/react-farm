from rest_framework import generics, permissions
from .serializers import CropStatDetailApiSerializer
from rest_framework.response import Response
from farms.models import Crop
from outcomes.models import Expense


class CropStatDetailApiView(generics.RetrieveAPIView):
    serializer_class = CropStatDetailApiSerializer
    permissions = [permissions.IsAuthenticated, ]

    
    def get_queryset(self):
        queryset = Crop.objects.filter(user=self.request.user)
        return queryset

    