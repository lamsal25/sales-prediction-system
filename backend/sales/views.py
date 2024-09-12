from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login


@api_view(['POST'])
def register(request):
    data = request.data
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    password1 = data.get('password1')
    if(password==password1):
        if User.objects.filter(username=username).exists(): # Pailei username registered xa db ma vane error return garxa
            return Response({'message': 'Username already exists!'})
        elif User.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists!'})
        else:
            User.objects.create_user(first_name=first_name, last_name=last_name, username=username, email=email, password=password)
            return Response({'message': 'Registered successfully'})
    else:
        return Response({'message': 'Passwords doesn\'t match!'})


@api_view(['POST'])
def log_in(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    user=authenticate(username=username,password=password)
    if not User.objects.filter(username=username).exists():
        return Response({'message': 'User doesn\'t exists!'})
    if user is not None:
        login(request,user)
        return Response({'message': 'Login successful'})
    else:
        return Response({'message': 'Try Again!'})
