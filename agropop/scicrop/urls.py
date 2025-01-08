from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_posts, name='list_posts'),  # URL para listagem de posts
    path('post/<str:title>/', views.post_detail, name='post_detail'),  # URL para detalhe do post
    path('add/', views.add_post, name='add_post'),  # URL para criar um novo post
]