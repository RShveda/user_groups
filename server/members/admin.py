from django.contrib import admin
from .models import Person, Group

# Register your models here.
admin.site.register(Person)
admin.site.register(Group)