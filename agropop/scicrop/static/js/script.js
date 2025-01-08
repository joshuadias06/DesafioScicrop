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



