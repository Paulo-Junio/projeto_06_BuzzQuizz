let ultimoClick;
let ID_DO_QUIZZ;
let numeroDePerguntas;
let perguntasRespondidas = 0;
let porcentagemDeAcerto=0;
let dados;


function buscarQuizz(quiz) {
    if (ID_DO_QUIZZ === undefined){
        let id = quiz.getAttribute("id")
    ID_DO_QUIZZ = id;
    }
    document.querySelector(".listagem").classList.add("hidden")
    document.querySelector(".perguntas").classList.remove("hidden")
    let promise= axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${ID_DO_QUIZZ}`)
    promise.then(renderizarQuizz)
}

function renderizarQuizz(resposta) {
    dados = resposta.data
    let alternativas = resposta.data.questions;
    let questoes =document.querySelector(".container");
    let elemento = document.querySelector(".titulo-quiz");
    questoes.innerHTML = "";
    elemento.innerHTML = "";
    numeroDePerguntas = alternativas.length;
    elemento.innerHTML = `<div class="topo-quiz" style="background:linear-gradient(0deg, rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),url(${resposta.data.image});">
            <span>${resposta.data.title}</span>
        </div>`
    for (let i=0; i<numeroDePerguntas; i++){
        let corDeFundo = alternativas[i].color;
        let respostas= alternativas[i].answers;
        respostas.sort(embaralharRespostas);
        let opcoes = respostas.length;
        questoes.innerHTML += `<div class="box-respostas">
            <div class="enunciado" style="background-color:${corDeFundo};">
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
            htmlRespostas += `<div class="resposta-certa opacidade" onclick="responderPergunta(this)">
                <img src="${respostas[i].image}" >
                <p>${respostas[i].text}</p>
            </div>` 
        } else {
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
    let conferirResposta = elemento.classList.contains("resposta-certa");
    if (conferirResposta == true){
        let pontos = (100/numeroDePerguntas);
        porcentagemDeAcerto += pontos;
    }
    let divPai=elemento.parentNode;
    perguntasRespondidas += 1;
    let verificarRespondida = divPai.classList.contains("respondida")
    if (!verificarRespondida == true) {
        if (perguntasRespondidas === numeroDePerguntas) {
            finalizarQuizzes()
            setTimeout(scrollFinal,2000)
        }
        if ( divPai !== ultimoClick) {
            elemento.parentNode.classList.add("respondida");
            elemento.classList.remove("opacidade");
            ultimoClick = divPai
            setTimeout(scroll,2000)
        }
    }
}

function scrollFinal() {
    let elemento= document.querySelector(".mensagem");
    elemento.scrollIntoView();
}

function finalizarQuizzes() {
    let pontos = Math.ceil(porcentagemDeAcerto);
    let paginaPerguntas=document.querySelector(".container");
    let niveis= dados.levels;
    let nivelDoJogador=0;
    for (let i=0; i<niveis.length; i++) {
        let comparador = niveis[i].minValue;
        if (pontos >= comparador) {
            nivelDoJogador = i;
        }
    }
    paginaPerguntas.innerHTML += `<div class="resultado-quiz">
        <div class="enunciado">
            <span>${pontos}% de acerto: ${niveis[nivelDoJogador].title}</span>
        </div>
        <div class="mensagem">
            <img src="${niveis[nivelDoJogador].image}">
            <div>
            <p>${niveis[nivelDoJogador].text}</p>
            </div>
        </div>
    </div>

    <div class="botoes" >
        <button class="reiniciar" onclick="reiniciarQuiz()">Reiniciar Quizz</button>
        <button class="home" onclick="voltarHome()">Voltar pra home</button>
    </div>`
}

//Esta função é para reiniciar o site

function voltarHome() {
    window.location.reload();
}

function reiniciarQuiz() {
    let elemento= document.querySelector(".topo-quiz");
    elemento.scrollIntoView();
    buscarQuizz()
}