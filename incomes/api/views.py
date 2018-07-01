from rest_framework import generics, permissions

from ..models import Invoice, InvoiceCategory
from .serializers import InvoiceSerializer, InvoiceCategorySerializer
from .permissions import IsOwnerOrReadOnly


class InvoiceApiView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class InvoiceDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class InvoiceCategoryApiView(generics.ListAPIView):
    serializer_class = InvoiceCategorySerializer
    queryset = InvoiceCategory.objects.all()
    permissions = [permissions.IsAuthenticatedOrReadOnly, ]