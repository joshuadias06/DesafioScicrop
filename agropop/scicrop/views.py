#IMPORT's
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from .models import Post


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
@csrf_exempt #Desabilitei a verificação para evitar erros nas requisicões!
def add_post(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        try:
            data = json.loads(request.body)
            title = data.get('title')
            content = data.get('content')

            if title and content:
                post = Post(title=title, content=content)
                post.save()
                return JsonResponse({'success': True, 'message': 'Post criado com sucesso!'})
            else:
                return JsonResponse({'success': False, 'message': 'Erro: Dados inválidos!'})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Erro ao processar os dados!'})
    return JsonResponse({'success': False, 'message': 'Requisição inválida!'})