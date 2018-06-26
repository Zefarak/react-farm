from django.test import TestCase
from .models import Invoice
# Create your tests here.


class InvoiceModelTest(TestCase):
    
    @classmethod
    def setUpTestData(cls):
        Invoice.objects.create(title='Test1',
                               value=55, 
                            )
    
    def test_title_content(self):
        test_1 = Invoice.objects.get(id=1)
        title = f'{test_1.title}'
        self.assertEquals(title, 'Test1')