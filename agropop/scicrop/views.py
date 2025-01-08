#IMPORT's
from django.shortcuts import render, redirect, get_object_or_404
from .models import Post
from .forms import PostForm

#CRUD DOS POST's (C -> CREATE, R -> READ, U -> UPDATED, D -> DELETE )

#R -> READ
def list_posts(request):
    posts = Post.objects.all().order_by('-date_created')
    return  render(request, 'posts/index.html', {'posts': posts})

#R -> READ
def post_detail(request, title):
    post = get_object_or_404(Post, title=title)
    return render (request, 'posts/post_detail.html', {'post': post})

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


