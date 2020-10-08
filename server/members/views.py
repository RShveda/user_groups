from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from members.models import Person, Group
from members.serializers import PersonSerializer, GroupSerializer
# Create your views here.


@csrf_exempt
def group_list(request):
    """
    List all groups or create a new one
    """
    if request.method == 'GET':
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = GroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def group_detail(request, pk):
    """
    Retrieve, update or delete a group.
    """
    try:
        group = Group.objects.get(pk=pk)
    except Group.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = GroupSerializer(group)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = GroupSerializer(group, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        group.delete()
        return HttpResponse(status=204)


@csrf_exempt
def person_list(request):
    """
    List all people or create a new one
    """
    if request.method == 'GET':
        members = Person.objects.all()
        serializer = PersonSerializer(members, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PersonSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def person_detail(request, pk):
    """
    Retrieve, update or delete a group.
    """
    try:
        person = Person.objects.get(pk=pk)
    except Person.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = PersonSerializer(person)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = PersonSerializer(person, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        person.delete()
        return HttpResponse(status=204)
