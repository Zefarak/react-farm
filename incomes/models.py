from django.db import models
from users.models import CustomUser
from farms.models import Crop
# Create your models here.

class InvoiceCategory(models.Model):
    title = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.title

class Invoice(models.Model):
    title = models.CharField(max_length=100)
    timestamp = models.DateField()
    value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    final_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    paid_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    is_paid = models.BooleanField(default=False)
    have_taxes = models.BooleanField(default=True)
    crop_related = models.ForeignKey(Crop, null=True, blank=True, on_delete=models.SET_NULL)
    category = models.ForeignKey(InvoiceCategory, null=True, on_delete=models.SET_NULL, related_name='invoices')
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name='invoices')

    def __str__(self):
        return f'{self.title}'

    def tag_category(self):
        return f'{self.category.title}' if self.category else None

    def tag_crop_related(self):
        return f'{self.crop_related}' if self.crop_related else None

    def tag_is_paid(self):
        return 'Πληρωμένο' if self.is_paid else 'Μη Πληρωμένο'