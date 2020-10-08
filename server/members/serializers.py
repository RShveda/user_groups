from rest_framework import serializers
from .models import Person, Group

class GroupSerializer(serializers.ModelSerializer):

    members_count = serializers.ReadOnlyField()

    class Meta:
        model = Group
        fields = ["id", "name", "description", "members_count"]


class PersonSerializer(serializers.ModelSerializer):

    group_name = serializers.ReadOnlyField()

    class Meta:
        model = Person
        fields = ["id", "username", "date", "group", "group_name"]

