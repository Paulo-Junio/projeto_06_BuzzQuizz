function responderPergunta(elemento) {
    console.log(elemento)
    elemento.classList.remove("opacidade")
    elemento.parentNode.classList.add("respondida")
}

function reiniciarQuiz() {
    let elemento = document.querySelector(".topo-quiz")
    console.log(elemento)
    window.location.reload()
    elemento.scrollIntoView()
}