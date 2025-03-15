from collections import defaultdict
import random
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.conf import settings
from django.http import JsonResponse
import pandas as pd
import numpy as np
import datetime
import os
import joblib
from .dictionary import TYPE_MAPPING, STORE_MAPPING, DEPT_MAPPING  # Import the dictionary

# Register user
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
            return Response({'message': 'Registered successfully'},status=200 )
    else:
        return Response({'message': 'Password does not match!'})
    

# Login user
@api_view(['POST'])
def log_in(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    # Check if the user exists
    if not User.objects.filter(username=username).exists():
        return JsonResponse({'message': 'User doesn\'t exist!'}, status=404)

    # Authenticate user
    user = authenticate(username=username, password=password)

    if user is not None:
        # Login the user and create a session
        login(request, user)
        sessionid = request.session.session_key
        print("session ID: ", sessionid)
        return JsonResponse({'message': 'Login Successful'}, status=200)
    else:
        # Handle incorrect credentials
        return JsonResponse({'message': 'Invalid username or password'}, status=401)     


# Load your preprocessed dataset
dataset_path = os.path.join(os.path.dirname(__file__), 'data', 'final_preprocessed_dataset.csv')
data = pd.read_csv(dataset_path)

def get_types(request):
    """
    Send TYPE_MAPPING dictionary to the frontend.
    """
    # Convert dictionary into a list of key-value pairs
    types = [{'id': key, 'name': value} for key, value in TYPE_MAPPING.items()]
    return JsonResponse({'types': types})


def get_stores(request, type):
    print(f"Incoming type: {type}")
    type = int(type)
    # Filtered data based on the type
    stores = data[data['type'] == type]['store'].unique().tolist()

    # Map store IDs to names using STORE_MAPPING
    mapped_stores = []
    for store in stores:
        name = STORE_MAPPING.get(store, f"Store {store}")
        mapped_stores.append({"id": store, "name": name})

    print('This is the store *********', mapped_stores)
    return JsonResponse({'stores': mapped_stores})




def get_departments(request, store):
    print(f"Incoming store: {store}")
    store = int(store)

    # Filter departments based on the selected store
    departments = data[data['store'] == store]['dept'].unique().tolist()

    # Map department IDs to names
    mapped_departments = []
    for dept in departments:
        name = DEPT_MAPPING.get(dept, f"Department {dept}")
        mapped_departments.append({"id": dept, "name": name})

    print('This is the departments *********', mapped_departments)
    return JsonResponse({'departments': mapped_departments})



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
    return JsonResponse({'week': (week_number+1)})



###  JOblib  ###

# Load the model 
model_path = os.path.join(os.path.dirname(__file__), 'data', 'walmart_model.joblib')
loaded_data = joblib.load(model_path)


@api_view(['POST'])
def predict_sales(request):
    try:
        data = request.data

        # Extract user inputs
        type_ = data.get("type")
        store = data.get("store")
        department = data.get("department")
        size = data.get("size")
        cpi = 100  # Hardcoded, or get from data if available
        start_week = int(data.get("week"))  # Starting week number
        
        # Validate inputs
        if None in [type_, store, department, size, start_week]:
            return JsonResponse({"error": "Missing input values."}, status=400)

        predictions = {}  # To store week: predicted sales
        monthly_predictions = defaultdict(list)  # To store monthly sales
        
        # Predict sales for 16 consecutive weeks (4 months)
        for i in range(12):
            current_week = start_week + i
            
            # Handle week overflow (assuming 52 weeks in a year)
            if current_week > 52:
                current_week = current_week % 52  # Wrap around to next year's week
            
            # Determine the month based on the week (1 to 12 months)
            month = min((current_week - 1) // 4 + 1, 12)
            
            input_data = np.array([[int(type_), int(store), int(department), 
                                    int(size), int(cpi), int(current_week)]])
            
            # Make prediction
            prediction = loaded_data.predict(input_data)

            # Store the prediction in the corresponding month
            monthly_predictions[month].append(round(int(prediction[0])))  

            # Optionally store the weekly predictions too (if needed)
            predictions[f"Week_{current_week}"] = round(int(prediction[0]))  
        
        # Calculate the monthly average sales for each month
            monthly_averages = {
            f"Month_{month}": sum(sales) / len(sales) if sales else 0
            for month, sales in monthly_predictions.items()
        }

        return JsonResponse({"predicted_sales": monthly_averages}, status=200)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# For the reports
def report_view(request):
    return render(request,"reports.html")