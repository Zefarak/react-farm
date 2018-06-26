from rest_framework import generics, permissions

from ..models import Invoice
from .serializers import InvoiceSerializer

class InvoiceApiView(generics.ListCreateAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class InvoiceDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer


