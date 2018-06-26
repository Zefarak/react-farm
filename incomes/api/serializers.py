from rest_framework import serializers

from ..models import Invoice


class InvoiceSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Invoice
        fields= ['timestamp', 'title', 'final_value', 'crop_related', 'user']
        