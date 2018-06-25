from django.db import models

# Create your models here.


class ExpenseDefaultModel(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=100)
    final_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    value = models.DecimalField(max_digits=20, decimal_places=2, default=0)

    class Meta:
        abstract = True



class Person(ExpenseDefaultModel):
    phone = models.CharField(max_length=10)
    notes = models.TextField()


class Payment(ExpenseDefaultModel):
    date_expired = models.DateField()
    person = models.ForeignKey(Person, null=True, on_delete=models.SET_NULL)
    category = models.CharField(max)
