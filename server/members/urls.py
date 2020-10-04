from django.urls import path
from members import views

urlpatterns = [
    path('groups/', views.group_list),
    path('groups/<int:pk>/', views.group_detail),
    path('members/', views.person_list),
    path('members/<int:pk>/', views.person_detail),
]