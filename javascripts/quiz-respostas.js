let ultimoClick;
// Esta função é para adicioar os estilos nas questões respondidas
function responderPergunta(elemento) {
    let divPai=elemento.parentNode
    console.log(divPai)
    if ( divPai !== ultimoClick) {
        elemento.classList.remove("opacidade");
        elemento.parentNode.classList.add("respondida");
        ultimoClick = divPai
    }
}

//Esta função é para reiniciar o quiz
function reiniciarQuiz() {
    let elemento = document.querySelector(".topo-quiz");
    window.location.reload();
    elemento.scrollIntoView();
}