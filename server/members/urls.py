from django.urls import path
from members import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.api_root),
    path('groups/', views.GroupList.as_view(), name="group-list"),
    path('groups/<int:pk>/', views.GroupDetail.as_view(), name="group-detail"),
    path('groups/<int:pk>/slug/', views.GroupSlug.as_view(), name="group-slug"),
    path('members/', views.PersonList.as_view(), name="member-list"),
    path('members/<int:pk>/', views.PersonDetail.as_view(), name="person-detail"),
    path('users/', views.UserList.as_view(), name="user-list"),
    path('users/<int:pk>/', views.UserDetail.as_view(), name="user-detail"),
]

urlpatterns = format_suffix_patterns(urlpatterns)