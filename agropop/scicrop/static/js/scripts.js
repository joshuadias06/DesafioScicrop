console.log("Página carregada com sucesso!");

// ABRIR O POP-UP.
document.getElementById('openPopup_btn').onclick = function() {
    document.getElementById('popup_form').style.display = "block";
    console.log("Abertura de Pop-up");
};

// FECHAR O POP-UP
document.getElementById('closePopup_btn').onclick = function() {
    document.getElementById('popup_form').style.display = "none";
    console.log("Fechamento de Pop-up");
};

document.getElementById('postForm').onsubmit = function(event) {
    event.preventDefault();  // Evita o envio normal do formulário.

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Criação de um objeto com os dados a serem enviados para o back-end
    const data = {
        title: title,
        content: content,
        csrfmiddlewaretoken: csrftoken
    };

    // FETCH COM O BACK-END
    fetch(addPostUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        // POSTAGEM CRIADA -> Imprime no console web mensagem de sucesso e da reload na página!
        if (data.success) {
            console.log('Postagem criada com sucesso!');
            window.location.reload();
            document.getElementById('popup_form').style.display = "none";  // Fecha o pop-up após o sucesso.
        } else {
            // ERRO NA CRIAÇÃO -> Aparece um alert na parte superior da página!
            alert('Erro ao criar postagem: ' + data.message);
        }
    })
    .catch(error => {
        // Imprime no console web mensagem de erro!
        console.log("Erro");
    });
};

//ABERTURA E PREENCHIMENTO DE POP-UP DE EDICAO - PUT.
const editButtons = document.querySelectorAll('.edit-post');

// Elementos do pop-up de edição
const editPopup = document.getElementById('editPopup_form');
const closeEditPopupBtn = document.getElementById('closeEditPopup_btn');
const editTitleInput = document.getElementById('editTitle');
const editContentInput = document.getElementById('editContent');
const editForm = document.getElementById('editPostForm');


// Função para abrir o pop-up de edição quando um botão de edição for clicado
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Botão de edição clicado');

        const postTitle = button.getAttribute('data-title') || '';
        const postContent = button.getAttribute('data-content') || 'Conteúdo não disponível';
        editTitleInput.value = postTitle;
        editContentInput.value = postContent;


        editPopup.style.display = 'flex';
        console.log('Pop-up de edição aberto');
    });
});

// Função para fechar o pop-up de edição
closeEditPopupBtn.addEventListener('click', () => {
    // Fechando o pop-up de edição
    editPopup.style.display = 'none';
    console.log('Pop-up de edição fechado');
});


// FETCH PUT
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const postId = button.getAttribute('data-id');
        const postTitle = button.getAttribute('data-title');
        const postContent = button.getAttribute('data-content');

        // Preenche os campos do formulário
        editTitleInput.value = postTitle;
        editContentInput.value = postContent;

        // Exibe o pop-up
        editPopup.style.display = 'flex';

        // Função de envio do formulário para o back-end (requisicao PUT)
        editForm.onsubmit = function(event) {
            event.preventDefault();  // Evita o envio normal do formulário

            const updatedTitle = editTitleInput.value;
            const updatedContent = editContentInput.value;

            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

            // Cria o objeto com os dados a serem enviados
            const data = {
                title: updatedTitle,
                content: updatedContent,
                csrfmiddlewaretoken: csrftoken
            };

            // Envia a requisição PUT
            fetch(`/edit_post/${postId}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Postagem atualizada com sucesso!');
                    window.location.reload();  // Atualiza a página após sucesso
                } else {
                    alert('Erro ao atualizar postagem: ' + data.message);
                }
            })
            .catch(error => {
                console.log("Error");
            });
        };
    });
});

//FETCH DELETE
//Selecionado botao de edicao
const deleteButtons = document.querySelectorAll('.delete-post');

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        const postId = button.getAttribute('data-id');
        var csrfToken = '{{ csrf_token }}';

        if (postId) {
            // Confirmação de deleção
            const confirmDelete = confirm("Tem certeza que deseja excluir esta postagem?");
            if (confirmDelete) {
                // Faz a requisição DELETE para deletar a postagem
                fetch(`/delete_post/${postId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        console.log('Postagem deletada com sucesso!');
                        button.closest('.post-item').remove();
                    } else {
                        console.log('Erro ao deletar postagem:', data.message);
                    }
                })
                .catch(error => {
                    console.log('Erro ao fazer a requisição:', error);
                });
            }
        } else {
            console.log('ID do post não encontrado!');
        }
    });
});
