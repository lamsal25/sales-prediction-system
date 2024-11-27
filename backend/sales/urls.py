from django.urls import path
from . import views
urlpatterns = [
path('register/', views.register, name='register'),
path('login/', views.log_in, name='login'),
path('types/', views.get_types, name='get_types'),
path('stores/<str:type>/', views.get_stores, name='get_stores'),
path('departments/<str:store>/', views.get_departments, name='get_departments'),
path('size/<str:type>/<str:store>/<str:department>/', views.get_size, name='get_size'),
path('week/', views.get_week, name='get_week'),
path('predict/', views.predict_sales, name='predict_sales'),
]

