from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.conf import settings
from django.http import JsonResponse
import pandas as pd
import numpy as np

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



from django.http import JsonResponse
import pandas as pd

# Load your preprocessed dataset
dataset_path = r'C:/Users/Nitro V16/OneDrive/Desktop/project/walmart_dataset/final_preprocessed_dataset.csv'
data = pd.read_csv(dataset_path)

def get_types(request):
    types = data['type'].unique().tolist()
    print('this is the type *********',types)
    return JsonResponse({'types': types})
    
def get_stores(request, type):
    print(f"Incoming type: {type}")
    type = int(type)
    # filtered_data = data[data['type'] == type]
    # print(f"Filtered data: {filtered_data}")
    stores = data[data['type'] == type]['store'].unique().tolist()
    print('This is the store *********', stores)
    return JsonResponse({'stores': stores})


def get_departments(request, store):
    print(f"Incoming store: {store}")
    store = int(store) 
    departments = data[data['store'] == store]['dept'].unique().tolist()
    print('This is the departments *********', departments)
    return JsonResponse({'departments': departments})


def get_size(request, type, store, department):
    # Filter the data based on the provided type, store, and department
    type = int(type)
    store = int(store)
    department = int(department)
    filtered_data = data[
        (data['type'] == type) &
        (data['store'] == store) &
        (data['dept'] == department)
    ]

    # Extract unique size values
    size = filtered_data['size'].unique()
    print('The size is : ++++',size)
    # Handle the case where size is empty
    if size > 0:  # Check if size has at least one element
        return JsonResponse({'size': int(size[0])})  # Assuming you want the first value
    else:
        return JsonResponse({'error': 'No size found for the given parameters'}, status=404)



def get_week(request):
    # Get the current date and calculate the ISO week number
    current_date = datetime.datetime.now()
    week_number = current_date.isocalendar()[1]  # ISO week number (1-52/53)
    return JsonResponse({'week': week_number+1})



###  JOblib  ###

# Load the model (ensure this path points to your uploaded model)
model_path = os.path.join(os.path.dirname(__file__), 'data', 'walmart_model.joblib')
loaded_data = joblib.load(model_path)


@api_view(['POST'])
def predict_sales(request):
    try:
        # Extract input data from the POST request
        data = request.data
        type_ = data.get("type")
        store = data.get("store")
        department = data.get("department")
        size = data.get("size")
        cpi = data.get("cpi")
        week = data.get("week")

        
        # Preprocess input data (convert to the required format)
        # Assuming all features need to be converted to floats
        try:
            input_data = np.array([[float(type_), float(store), float(department), 
                                    float(size), float(cpi), float(week)]])
          
        except ValueError as ve:
            return JsonResponse({"error": "Invalid input format. Ensure numeric fields are properly formatted."}, status=400)

        # Make the prediction
        prediction = loaded_data.predict(input_data)

        # Return the prediction
        return JsonResponse({"predicted_sales": f"{float(prediction[0]):.2f}"}, status=200)


    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
