from rest_framework import serializers

from ..models import Payroll, PayrollCategory, Expense, ExpenseCategory


class ExpenseListSerializer(serializers.ModelSerializer):
    category_slug = serializers.ReadOnlyField(source='category.title')
    crop_slug = serializers.ReadOnlyField(source='crop_related.name')
    user_slug = serializers.ReadOnlyField(source='user.username')
    url = serializers.HyperlinkedIdentityField(view_name='expense_detail')

    class Meta:
        model = Expense
        fields = ['url', 'category_slug', 'crop_slug', 'user_slug',
                  'timestamp', 'final_value', 'title',
                  'crop_related', 'category',
                  'user', 'id'    
                ]

    
class ExpenseDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = ['title', 'user', 'id', 'category', 
                  'final_value', 'crop_related'
                  ]


class ExpenseCategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='expense_cate_detail', )

    class Meta:
        model = ExpenseCategory
        fields = ['title', 'id', 'url']