from rest_framework import generics, permissions
from rest_framework import filters
from .serializers import CropStatDetailApiSerializer, ExpenseStatSerializer, IncomesStatsSerializer
from rest_framework.response import Response
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from farms.models import Crop
from outcomes.models import Expense
from incomes.models import Invoice

import datetime

CURRENCY =  '€'

class CropStatDetailApiView(generics.RetrieveAPIView):
    serializer_class = CropStatDetailApiSerializer
    permissions = [permissions.IsAuthenticated, ]

    def get_queryset(self):
        queryset = Crop.objects.filter(user=self.request.user)
        return queryset


class ExpenseCropStatApiView(generics.ListAPIView):
    serializer_class = ExpenseStatSerializer
    permission_classes = (permissions.IsAuthenticated, )


    def get_queryset(self):
        queryset = Expense.objects.filter(user=self.request.user)
        return queryset

    def get(self, request, *args, **kwargs):
        data = {}
        pk = self.kwargs.get('pk')
        qs_exists = Crop.objects.filter(id=pk, user=self.request.user)
        if qs_exists.exists:
            instance = qs_exists.first()
        else:
            data['error'] : 'The is no crop with this associated user'
        queryset = Expense.objects.filter(crop_related=instance)
        data['total_value'] = queryset.aggregate(Sum('final_value'))['final_value__sum'] if queryset else 0
        data['paid_value'] = queryset.filter(is_paid=True).aggregate(Sum('final_value'))['final_value__sum'] if queryset else 0
        return Response(data)


class IncomesCropStatApiView(generics.ListAPIView):
    serializer_class = IncomesStatsSerializer
    filter_backends = (filters.SearchFilter,)
    filter_fields = ('timestamp', )

    def get_queryset(self):
        queryset = Invoice.objects.filter(user=self.request.user)
        return queryset

    def get(self, request, *args, **kwargs):
        data = {}
        pk = self.kwargs.get('pk', None)
        crop = get_object_or_404(Crop, id=pk)
        queryset = self.queryset.filter(crop_related=crop)
        data['total_value'] = queryset.aggregate(Sum('final_value'))['final_value__sum'] if queryset else 0
        data['paid_value'] = queryset.filter(is_paid=True).aggregate(Sum('final_value'))['final_value__sum'] if queryset else 0
        return Response(data)


class IncomesReportApiView(generics.ListAPIView):
    serializer_class = IncomesStatsSerializer
    

    def get(self, request, *args, **kwargs):
        data = {}
        queryset = Invoice.objects.filter(user=self.request.user)
        queryset_expenses = Expense.objects.filter(user=self.request.user)
        date_start = request.query_params.get('date_start') if request.query_params.get('date_start', None) else datetime.datetime.now().date().replace(month=1, day=1)
        date_end = request.query_params.get('date_end', None) if request.query_params.get('date_end', None) else datetime.datetime.now().today()
        
        total_sells = queryset.filter(timestamp__range=[date_start, date_end]).aggregate(Sum('final_value'))['final_value__sum'] \
                      if queryset.filter(timestamp__range=[date_start, date_end]) else 0
        total_expenses = queryset_expenses.filter(date_created__range=[date_start, date_end]).aggregate(Sum('final_value'))['final_value__sum'] \
                         if queryset_expenses.filter(date_created__range=[date_start, date_end]) else 0
        total_pending_expense = queryset_expenses.filter(date_created__range=[date_start, date_end], is_paid=False).aggregate(Sum('final_value'))['final_value__sum'] \
                                if queryset_expenses.filter(is_paid=False, date_created__range=[date_start, date_end]) else 0

        diff = total_sells - total_expenses
        data['total_sells'] = f'{total_sells} {CURRENCY}'
        data['total_expenses'] = f'{total_expenses} {CURRENCY}'
        data['pending_payments'] = f'{total_pending_expense} {CURRENCY}'
        data['diff'] = f'{diff} {CURRENCY}'

        return Response(data)