from django.urls import path
from . import views
from .views import edit_post, delete_post

urlpatterns = [
    path('', views.list_posts, name='list_posts'),  # URL para listagem de posts
    path('post/<str:title>/', views.post_detail, name='post_detail'),  # URL para detalhe do post
    path('add/', views.add_post, name='add_post'),  # URL para criar um novo post
    path('edit_post/<int:post_id>/', edit_post, name='edit_post'),
    path('delete_post/<int:post_id>/', delete_post, name='delete_post'),
]