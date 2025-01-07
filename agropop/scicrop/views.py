from django.shortcuts import render
from .models import Post

# Create your views here.

def list_posts(request):
    posts = Post.objects.all()
    return  render(request, 'posts/index.html', {'posts': posts})
