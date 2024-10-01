from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
import jwt
import datetime
from django.conf import settings


import os
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder
from io import BytesIO
import base64


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



@api_view(['GET'])
def forecast_sales(request):
    # File paths for train and test data
    csv_train_file_path = os.path.join(os.path.dirname(__file__), 'data', 'train.csv')
    csv_test_file_path = os.path.join(os.path.dirname(__file__), 'data', 'test.csv')

    # Load the datasets
    train_df = pd.read_csv(csv_train_file_path)
    test_df = pd.read_csv(csv_test_file_path)

    # Handle categorical variables with Label Encoding
    label_encoder = LabelEncoder()
    train_df['Item_Type'] = label_encoder.fit_transform(train_df['Item_Type'])
    train_df['Outlet_Identifier'] = label_encoder.fit_transform(train_df['Outlet_Identifier'])
    train_df['Outlet_Location_Type'] = label_encoder.fit_transform(train_df['Outlet_Location_Type'])
    train_df['Outlet_Type'] = label_encoder.fit_transform(train_df['Outlet_Type'])
    test_df['Item_Type'] = label_encoder.fit_transform(test_df['Item_Type'])
    test_df['Outlet_Identifier'] = label_encoder.fit_transform(test_df['Outlet_Identifier'])
    test_df['Outlet_Location_Type'] = label_encoder.fit_transform(test_df['Outlet_Location_Type'])
    test_df['Outlet_Type'] = label_encoder.fit_transform(test_df['Outlet_Type'])

    # Prepare data
    X_train = train_df[['Item_Type', 'Item_MRP', 'Outlet_Identifier', 'Outlet_Location_Type', 'Outlet_Type']]
    y_train = train_df['Item_Outlet_Sales']
    X_test = test_df[['Item_Type', 'Item_MRP', 'Outlet_Identifier', 'Outlet_Location_Type', 'Outlet_Type']]

    # Train the model
    model = GradientBoostingRegressor(n_estimators=1000, learning_rate=0.001, max_depth=6)
    model.fit(X_train, y_train)

    # Make predictions
    y_train_pred = model.predict(X_train)

    # Generate the plot
    plt.figure(figsize=(10, 6))
    plt.plot(y_train.values[:100], label='Actual Sales (Train)')
    plt.plot(y_train_pred[:100], label='Predicted Sales (Train)', linestyle='--')
    plt.legend()
    plt.title('Actual vs Predicted Sales (Train)')
    plt.xlabel('Index')
    plt.ylabel('Sales')

    # Save the plot to a PNG file
    image_buffer = BytesIO()
    plt.savefig(image_buffer, format='png')
    image_buffer.seek(0)
    
    # Encode image in base64 for sending to frontend
    image_base64 = base64.b64encode(image_buffer.read()).decode('utf-8')
    
    return Response({'image': image_base64})