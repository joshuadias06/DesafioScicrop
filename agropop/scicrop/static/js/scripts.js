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

//FETCH EXTRA - PUT.
const editButtons = document.querySelectorAll('.edit-post');

//ELEMENTOS DO POP-UP
const editPopup = document.getElementById('editPopup_form');
const closeEditPopupBtn = document.getElementById('closeEditPopup_btn');
const editTitleInput = document.getElementById('editTitle');
const editContentInput = document.getElementById('editContent');
const editForm = document.getElementById('editPostForm');

//FUNCAO PARA ABRIR O POP-UP DE EDICAO.
editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
                console.log('Botão de edição clicado');

        const postTitle = button.getAttribute('data-title') || '';
        const postContent = button.getAttribute('data-content') || 'Conteúdo não disponível';


        editTitleInput.value = postTitle;
        editContentInput.value = postContent;

        editPopup.style.display = 'block';
        console.log('Pop-up de edição aberto');
    });
});

closeEditPopupBtn.addEventListener('click', () => {
    editPopup.style.display = 'none';
    console.log('Pop-up de edição fechado');
});