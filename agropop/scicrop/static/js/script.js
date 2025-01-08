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
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Criação de um FormData para enviar como formulário.
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("csrfmiddlewaretoken", csrftoken);

    // FETCH COM O BACK-END
    fetch("{% url 'add_post' %}", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // POSTAGEM CRIADA -> Imprime no console web mensagem de sucesso e da reload na página!
        if (data.success) {
            console.log('Postagem criada com sucesso!');
            window.location.reload();
        } else {
            // ERRO NA CRIAÇÃO -> Aparece um alert na parte superior da página!
            alert('Erro ao criar postagem.');
        }
    })
    .catch(error => {
        // Imprime no console web mensagem de erro!
        console.error("Erro:", error);
    });
};
