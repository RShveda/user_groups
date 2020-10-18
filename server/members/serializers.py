from rest_framework import serializers
from .models import Person, Group
from django.contrib.auth.models import User


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    members_count = serializers.ReadOnlyField()
    owner = serializers.ReadOnlyField(source='owner.username')
    slug = serializers.HyperlinkedIdentityField(view_name='group-slug')

    class Meta:
        model = Group
        fields = ['url', "id", "name", 'slug', "description", "members_count", "owner"]


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    group_name = serializers.ReadOnlyField()

    class Meta:
        model = Person
        fields = ["url", "id", "username", "date", "group", "group_name"]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    group_items = serializers.HyperlinkedRelatedField(many=True, view_name='group-detail', read_only=True)

    class Meta:
        model = User
        fields = ["url", 'id', 'username', 'group_items']
