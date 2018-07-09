from rest_framework import serializers

from ..models import Payroll, PayrollCategory, Expense, ExpenseCategory


class ExpenseListSerializer(serializers.ModelSerializer):
    category_slug = serializers.ReadOnlyField(source='category.title')
    # crop_slug = serializers.ReadOnlyField(source='crop_related.name')
    user_slug = serializers.ReadOnlyField(source='user.username')
    url = serializers.HyperlinkedIdentityField(view_name='expense_detail')
    
    class Meta:
        model = Expense
        fields = ['url', 'category_slug', 'tag_crop_related', 
                  'user_slug', 'tag_paid', 'tag_taxes',
                  'date_created', 'final_value', 'title', 'is_paid', 'is_taxes',
                  'crop_related', 'category',
                  'user', 'id'    
                ]

    
class ExpenseDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = ['title', 'final_value', 'tag_category',
                  'tag_crop_related', 'tag_paid', 'tag_taxes',
                  'is_paid', 'is_taxes',
                  'user', 'id', 'category', 
                  'crop_related', 'date_created'
                  ]


class ExpenseCategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='expense_cate_detail', )

    class Meta:
        model = ExpenseCategory
        fields = ['title', 'id', 'url']


class PayrollSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='payroll_detail')

    class Meta:
        model = Payroll
        fields = ['date_end', 'title', 'final_value', 'is_paid', 'crop_related', 'tag_crop_related', 'is_taxes',
                  'category', 'tag_category', 'url', 'id', 'tag_paid', 'tag_taxes'
                  ]


class PayrollCategorySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='payroll_cate_detail')

    class Meta:
        model = PayrollCategory
        fields = ['title','user', 'is_public', 'url', 'id']