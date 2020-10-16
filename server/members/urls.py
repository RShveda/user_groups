from django.urls import path
from members import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('groups/', views.GroupList.as_view()),
    path('groups/<int:pk>/', views.GroupDetail.as_view()),
    path('members/', views.PersonList.as_view()),
    path('members/<int:pk>/', views.PersonDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)