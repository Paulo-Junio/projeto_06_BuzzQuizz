let ultimoClick;
let ID_DO_QUIZZ = 1244;

function buscarQuizz() {
    let promise= axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${ID_DO_QUIZZ}`)
    promise.then(renderizarQuizz)
}

function renderizarQuizz(resposta) {
    console.log(resposta)
    let alternativas = resposta.data.questions;
    console.log(alternativas)
    let questoes =document.querySelector(".container");
    console.log(alternativas.length)
    for (let i=0; i<alternativas.length; i++){
        console.log("entrei no for")
        let respostas= alternativas[i].answers;
        respostas.sort(embaralharRespostas);
        let opcoes = respostas.length;
        questoes.innerHTML += `<div class="box-respostas">
            <div class="enunciado">
                <span>${alternativas[i].title}</span>
            </div>
            <div class="respostas">
            ${renderizarRespostas(opcoes,respostas)}
                </div>
            </div>` 
    }
    
}

function renderizarRespostas (opcoes,respostas) {
    let htmlRespostas='';
    for (let i =0; i<opcoes; i++){
        if (respostas[i].isCorrectAnswer === true){
            console.log("entrei no if")
            htmlRespostas += `<div class="resposta-certa opacidade" onclick="responderPergunta(this)">
                <img src="${respostas[i].image}" >
                <p>${respostas[i].text}</p>
            </div>` 
        } else {
            console.log("entrei no else")
            htmlRespostas += `<div class="resposta-errada opacidade" onclick="responderPergunta(this)">
                <img src="${respostas[i].image}" >
                <p>${respostas[i].text}</p>
            </div>` 
        }
    }
    return htmlRespostas;
}

function embaralharRespostas(){
    return Math.random() - 0.5;
}

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

buscarQuizz()
