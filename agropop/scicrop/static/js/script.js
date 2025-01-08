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

    // Criação de um FormData para enviar como formulário.
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("csrfmiddlewaretoken", csrftoken);

    // FETCH COM O BACK-END
    fetch(addPostUrl, {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Postagem criada com sucesso!');
            window.location.reload();
            document.getElementById('popup_form').style.display = "none";
        } else {
            alert('Erro ao criar postagem: ' + data.message);
        }
    })
    .catch(error => {
        console.log("Erro");
    });
};
