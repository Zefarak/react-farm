from rest_framework import serializers
from ..models import CustomUser
from incomes.models import Invoice


class UserSerializer(serializers.ModelSerializer):
    invoices = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Invoice.objects.all())

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'invoices')

