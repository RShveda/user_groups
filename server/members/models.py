from django.db import models


# Create your models here.
class Group(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name

    def members_count(self):
        members = Person.objects.filter(group=self.id)
        return len(members)


class Person(models.Model):
    username = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    group = models.ForeignKey(Group, blank=True, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.username

    def group_name(self):
        return str(self.group)
