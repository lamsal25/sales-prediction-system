from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.conf import settings
from django.http import JsonResponse
import pandas as pd

import jwt
import datetime
import os
import joblib
import json


@api_view(['POST'])
def register(request):
    data = request.data
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    password1 = data.get('password1')
    
    if password == password1:
        if User.objects.filter(username=username).exists():
            return Response({'message': 'Username already exists!'})
        elif User.objects.filter(email=email).exists():
            return Response({'message': 'Email already exists!'})
        else:
            User.objects.create_user(first_name=first_name, last_name=last_name, username=username, email=email, password=password)
            return Response({'message': 'Registered successfully'})
    else:
        return Response({'message': 'Passwords do not match!'})

@api_view(['POST'])
def log_in(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username, password=password)

    if not User.objects.filter(username=username).exists():
        return Response({'message': 'User doesn\'t exist!'})

    if user is not None:
        login(request, user)
        token = jwt.encode({
            'username': user.username,
            'exp': datetime.datetime.now() + datetime.timedelta(hours=1)
        },settings.SECRET_KEY_1)

        return Response({'token': token, 'message': 'Login successful'}, status=200)
    else:
        return Response({'message': 'Invalid credentials!'}, status=400)


# Load the model (ensure this path points to your saved model)
model_path =  os.path.join(os.path.dirname(__file__), 'data', 'model.joblib')
loaded_data = joblib.load(model_path)
model = loaded_data['model']
manual_mean = loaded_data['manual_mean']

@api_view(['POST'])
def predict_sales(request):
    data = json.loads(request.body)

    # Extract data fields from the request
    item_type = data['Item_Type']
    item_mrp = data['Item_MRP']
    outlet_identifier = data['Outlet_Identifier']
    outlet_location_type = data['Outlet_Location_Type']
    outlet_type = data['Outlet_Type']
    item_fat_content = data['Item_Fat_Content']
    outlet_size = data['Outlet_Size']

    # Prepare data for the model
    input_data = pd.DataFrame([[item_type, item_mrp, outlet_identifier, outlet_location_type, outlet_type, item_fat_content, outlet_size]], 
                               columns=['Item_Type', 'Item_MRP', 'Outlet_Identifier', 'Outlet_Location_Type', 'Outlet_Type', 'Item_Fat_Content', 'Outlet_Size'])  
      
    # Predict sales and adjust with the manual mean
    predicted_residual = model.predict(input_data)
    predicted_sales = manual_mean + predicted_residual[0]

    return JsonResponse({'predicted_sales': predicted_sales})
