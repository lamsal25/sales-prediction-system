from django.urls import path
from .views import item

urlpatterns = [
    path('fetchitem/',item)

]