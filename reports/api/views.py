from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework import filters
from .serializers import (CropStatDetailApiSerializer, ExpenseStatSerializer, IncomesStatsSerializer,
                          FarmReportSerializer, CropReportSerializer
                          )
from rest_framework.response import Response
from rest_framework.reverse import reverse
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from farms.models import Crop, Farm
from outcomes.models import Expense, Payroll
from incomes.models import Invoice

import datetime

CURRENCY = '€'


@api_view(['GET'])
def report_api(request, format=None):
    return Response({
        'farm_report': reverse('report_farms', request=request, format=format),
        'crops_report': reverse('report_crops', request=request, format=format),
        'reports_incomes': reverse('report_incomes', request=request, format=format),


    })


class CropStatDetailApiView(generics.RetrieveAPIView):
    serializer_class = CropStatDetailApiSerializer
    permissions = (permissions.IsAuthenticated,)

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
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        data = {}
        queryset = Invoice.objects.filter(user=self.request.user)
        
        date_start = request.query_params.get('date_start') if request.query_params.get('date_start', None) else datetime.datetime.now().date().replace(month=1, day=1)
        date_end = request.query_params.get('date_end', None) if request.query_params.get('date_end', None) else datetime.datetime.now().today()
        
        sells_queryset = queryset.filter(timestamp__range=[date_start, date_end])
        total_sells = sells_queryset.aggregate(Sum('final_value'))['final_value__sum'] if sells_queryset else 0
        sells_per_cate = sells_queryset.values('category__title').annotate(sells=Sum('final_value')).order_by('sells')
        data['total_sells'] = f'{total_sells} {CURRENCY}'
        data['sells_per_cate'] = sells_per_cate

        queryset_expenses = Expense.objects.filter(user=self.request.user, date_created__range=[date_start, date_end])
        total_expenses = queryset_expenses.aggregate(Sum('final_value'))['final_value__sum'] if queryset_expenses else 0
        expenses_per_cate = queryset_expenses.values('category__title').annotate(expenses=Sum('final_value')).order_by('expenses')
        data['total_expenses'] = f'{total_expenses} {CURRENCY}'
        data['expenses_per_cate'] = expenses_per_cate

        queryset_payroll = Payroll.objects.filter(user=self.request.user, date_end__range=[date_start, date_end])
        total_payroll = queryset_payroll.aggregate(Sum('final_value'))['final_value__sum'] if queryset_payroll else 0
        payroll_per_cate = queryset_payroll.values('category__title').annotate(payroll=Sum('final_value'))

        total_pending_expense = queryset_expenses.filter(date_created__range=[date_start, date_end], is_paid=False).aggregate(Sum('final_value'))['final_value__sum'] \
                                if queryset_expenses.filter(is_paid=False, date_created__range=[date_start, date_end]) else 0
        diff = total_sells - total_expenses
        data['pending_payments'] = f'{total_pending_expense} {CURRENCY}'
        data['diff'] = f'{diff} {CURRENCY}'

        return Response(data)


class FarmReportApiView(generics.ListAPIView):
    serializer_class = FarmReportSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return Farm.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        data = {}
        date_start, date_end =datetime.datetime.now().date().replace(month=1, day=1), datetime.datetime.now().today()
        queryset = self.get_queryset()
        crops = Crop.objects.filter(farm__in=queryset)
        incomes = Invoice.objects.filter(crop_related__in=crops, timestamp__range=[date_start, date_end])
        data['incomes'] = incomes.aggregate(Sum('final_value'))['final_value__sum'] if incomes else 0
        expenses = Expense.objects.filter(crop_related__in=crops, date_created__range=[date_start, date_end])
        data['expenses'] = expenses.aggregate(Sum('final_value'))['final_value__sum'] if expenses else 0
        payroll =  Payroll.objects.filter(crop_related__in=crops, timestamp__range=[date_start, date_end])
        data['payroll'] = payroll.aggregate(Sum('final_value'))['final_value__sum'] if payroll else 0
        data['count'] = queryset.count() if queryset else 0
        data['area'] = queryset.aggregate(Sum('area'))['area__sum'] if queryset else 0
        if data['count'] > 0:
            data['incomes_avg'] = data['incomes']/data['count']
            data['expenses_avg'] = data['expenses']/data['count']
            data['payroll_avg'] = data['payroll']/data['count']        

        return Response(data)


class CropReportApiView(generics.ListAPIView):
    serializer_class = CropReportSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return Crop.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        data = {}
        queryset = self.get_queryset()
        trees = queryset.aggregate(Sum('qty'))['qty__sum'] if queryset else 0
        area = queryset.aggregate(Sum('area'))['area__sum'] if queryset else 0
        data['trees'] = trees
        data['area'] = area

        return Response(data)