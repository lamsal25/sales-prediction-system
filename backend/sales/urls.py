from django.urls import path
from . import views
urlpatterns = [
path('register/', views.register, name='register'),
path('login/', views.log_in, name='login'),
path('forecast/', views.forecast_sales, name='login'),
]