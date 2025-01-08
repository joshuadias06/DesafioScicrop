console.log("Página carregada com sucesso!");

//ABRIR O POP-UP.
document.getElementById('openPopup_btn').onclick = function(){
    document.getElementById('popup_form').style.display = "block";
    console.log("Abertura de Pop-up")
};

//FECHAR O POP-UP
document.getElementById('closePopup_btn').onclick = function() {
    document.getElementById('popup_form').style.display = "none";
    console.log("Fechamento de Pop-up")
};

//FECHAR O POP-UP COM CLICK FORA
window.onclick = function(event) {
    const popup = document.getElementById('popup_form');
    if (!popup.contains(event.target) && event.target !== document.getElementById('openPopup_btn')) {
        popup.style.display = "none";
    }
};

document.getElementById('postForm').onsubmit = function(event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Envio via fetch (AJAX)
    fetch("{% url 'add_post' %}", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            title: title,
            content: content
        })
    })
    .then(response => response.json())
    .then(data => {
        // Se o post foi criado com sucesso
        if (data.success) {
            alert('Postagem criada com sucesso!');
            window.location.reload(); // Recarrega a página para exibir o novo post
        } else {
            alert('Erro ao criar postagem.');
        }
    })
    .catch(error => {
        console.error("Erro:", error);
    });
};


