from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
@api_view(['POST'])
def register(request):
    if  request.method== 'POST':
        print(request.data)
        registerserializer=UserSerializer(data=request.data)
        if registerserializer.is_valid():
            registerserializer.save()
            return JsonResponse({'status':'successful','message':'Registration Succesful'}) 
        return JsonResponse({'status':'error','message':'Registration Failure'})
