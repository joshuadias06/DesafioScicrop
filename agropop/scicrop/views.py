#IMPORT's
from django.shortcuts import render, redirect
from .models import Post
from .forms import PostForm

#CRUD DOS POST's (C -> CREATE, R -> READ, U -> UPDATED, D -> DELETE )

#R -> READ
def list_posts(request):
    posts = Post.objects.all()
    return  render(request, 'posts/index.html', {'posts': posts})

#C -> CREATE
def add_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect(list_posts)
        else:
            form = PostForm()
        return render(request, 'posts/add_post.html', {'form': form})


