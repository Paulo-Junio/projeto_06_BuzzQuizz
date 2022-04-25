let ultimoClick;
let ID_DO_QUIZZ;
let numeroDePerguntas;
let perguntasRespondidas = 0;
let porcentagemDeAcerto=0;


function buscarQuizz(quiz) {
    let id = quiz.getAttribute("id")
    ID_DO_QUIZZ = id;
    document.querySelector(".listagem").classList.add("hidden")
    document.querySelector(".perguntas").classList.remove("hidden")
    console.log(ID_DO_QUIZZ)
    let promise= axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${ID_DO_QUIZZ}`)
    promise.then(renderizarQuizz)
}

function renderizarQuizz(resposta) {
    console.log(resposta)
    let alternativas = resposta.data.questions;
    console.log(alternativas)
    let questoes =document.querySelector(".container");
    console.log(alternativas.length)
    numeroDePerguntas = alternativas.length;
    for (let i=0; i<numeroDePerguntas; i++){
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
    let conferirResposta = elemento.classList.contains("resposta-certa");
    if (conferirResposta == true){
        let pontos = (100/numeroDePerguntas);
        porcentagemDeAcerto += pontos;
    }
    console.log("conferirResposta: " + conferirResposta)
    let divPai=elemento.parentNode;
    console.log(divPai)
    perguntasRespondidas += 1;
    console.log("respondidas: " + perguntasRespondidas)
    console.log("opcoes: " + perguntasRespondidas)
    if (perguntasRespondidas === numeroDePerguntas) {
        finalizarQuizzes()
    }
    if ( divPai !== ultimoClick) {
        elemento.parentNode.classList.add("respondida");
        elemento.classList.remove("opacidade");
        ultimoClick = divPai
    }
    
}

function finalizarQuizzes() {
    console.log("ENTREI NO FINALIZAR")
    let pontos = Math.ceil(porcentagemDeAcerto);
    let paginaPerguntas=document.querySelector(".container");
    paginaPerguntas.innerHTML += `<div class="resultado-quiz">
        <div class="enunciado">
            <span>${pontos}% de acerto: Você é praticamente um aluno de Hogwarts!</span>
        </div>
        <div class="mensagem">
            <img src="./Images/mensagem.png">
            <div>
            <p>Parabéns Potterhead! Bem-vindx a Hogwarts, aproveite o loop infinito de comida e clique no botão abaixo para usar o vira-tempo e reiniciar este teste.</p>
            </div>
        </div>
    </div>

    <div class="botoes" >
        <button class="reiniciar" onclick="reiniciarQuiz()">Reiniciar Quizz</button>
        <button class="home">Voltar pra home</button>
    </div>`
}

//Esta função é para reiniciar o quiz
function reiniciarQuiz() {
    let elemento = document.querySelector(".topo-quiz");
    window.location.reload();
    elemento.scrollIntoView();
}
