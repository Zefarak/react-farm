from rest_framework import serializers

from ..models import Invoice, InvoiceCategory


class InvoiceCategorySerializer(serializers.ModelSerializer):


    class Meta:
        model = InvoiceCategory
        fields = '__all__'


class InvoiceSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    url = serializers.HyperlinkedIdentityField(view_name='incomes_detail', format='html')

    class Meta:
        model = Invoice
        fields = ['timestamp', 'title', 'final_value', 'crop_related', 'user',
                 'tag_category', 'category', 'tag_crop_related', 'tag_is_paid', 'is_paid',
                 'have_taxes', 'paid_value', 'url'
                 ]
