#IMPORT's
import json
from django.http import JsonResponse, HttpResponseNotAllowed
from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.csrf import csrf_exempt

from .models import Post


#CRUD DOS POST's (C -> CREATE, R -> READ, U -> UPDATED, D -> DELETE)

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


#EXTRA METHOD's -> UPDATE and DELETE

# U -> UPDATE
"""
Este método foi bem mais simples de fazer por conta que já tinha o post, e deu para reutilizar 
a estrutura dele, mudando somente o tipo de requisição que é PUT para o UPDATE.
"""
@csrf_exempt
def edit_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            new_title = data.get('title')
            new_content = data.get('content')

            if new_title and new_content:
                post.title = new_title
                post.content = new_content
                post.save()
                return JsonResponse({'success': True, 'message': 'Post atualizado com sucesso!'})
            else:
                return JsonResponse({'success': False, 'message': 'Erro: Dados inválidos para atualização!'})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Erro ao processar os dados para atualização!'})
    else:
        return HttpResponseNotAllowed(['PUT'], content="Método não permitido. Use o método PUT.")


# D -> DELETE
@csrf_exempt
def delete_post(request, post_id):
    if request.method == 'DELETE':
        post = get_object_or_404(Post, id=post_id)
        try:
            post.delete()
            return JsonResponse({'success': True, 'message': 'Post excluído com sucesso!'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Erro ao excluir post: {str(e)}'})
    else:
        return HttpResponseNotAllowed(['DELETE'], content="Método não permitido. Use o método DELETE.")


#CRUD COMPLETO -> C -> CREATE, R -> READ, U -> UPDATED, D -> DELETE