from django.urls import path
from . import views
urlpatterns = [
path('register/', views.register, name='register'),
path('login/', views.log_in, name='login'),
path('predict/', views.predict_sales, name='predict_sales'),
]