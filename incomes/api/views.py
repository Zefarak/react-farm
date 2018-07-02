from rest_framework import generics, permissions, pagination
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Invoice, InvoiceCategory
from .serializers import InvoiceSerializer, InvoiceCategorySerializer
from .permissions import IsOwnerOrReadOnly


class InvoicePagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        user = self
        context = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'results': data,

        }
        return Response(context)



class InvoiceApiView(generics.ListCreateAPIView):
    serializer_class = InvoiceSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_fields = ('category', 'crop_related')
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    search_fields = ('title', )
    pagination_class = (InvoicePagination)


    def get_queryset(self):
        queryset = Invoice.objects.filter(user=self.request.user)
        return queryset

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