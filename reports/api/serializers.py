from rest_framework import serializers
from farms.models import Crop
from outcomes.models import Expense
from incomes.models import Invoice


class CropStatDetailApiSerializer(serializers.Serializer):
    
    class Meta:
        model = Crop
        fields = ['title', 'qty']


class ExpenseStatSerializer(serializers.Serializer):

    class Meta:
        model = Expense
        fields = ['user', 'final_value', 'crop_related']


class IncomesStatsSerializer(serializers.Serializer):

    class Meta:
        model = Invoice
        fields = ['title', 'final_value', 'is_paid', 'have_taxes']