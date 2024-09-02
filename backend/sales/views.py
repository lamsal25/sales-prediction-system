from django.shortcuts import render
from .models import Item
from rest_framework.decorators import api_view
from .serializers import ItemSerializers
from rest_framework.response import Response

# Create your views here.
@api_view(['GET'])
def item(request):
    items = Item.objects.all()

    serializer = ItemSerializers(items, many=True)
    return Response(serializer.data)