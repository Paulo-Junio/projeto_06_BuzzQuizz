let ultimoClick;
let ID_DO_QUIZZ = 840;

function buscarQuizz() {
    let promise= axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${ID_DO_QUIZZ}`)
    promise.then(renderizarQuizz)
}

function renderizarQuizz(resposta) {
    let alternativas = resposta.answers;
    alternativas.sort(embaralharRespostas);
    let questoes =document.querySelector(".container");
     questoes.innerHTML += `<div class="box-respostas">
            <div class="enunciado">
                <span>${resposta.title}</span>
            </div>
            <div class="respostas">`
    for (let i=0; i<alternativas.lenght; i++){
        if (alternativas[i].isCorrectAnswer === true){
            questoes.innerHTML += `<div class="resposta-certa opacidade" onclick="responderPergunta(this)">
                <img src="${alternativas[i].image}" >
                <p>${alternativas[i].text}</p>
            </div>`
        } else {
            questoes.innerHTML += `<div class="resposta-errada opacidade" onclick="responderPergunta(this)">
                <img src="${alternativas[i].image}" >
                <p>${alternativas[i].text}</p>
            </div>`
        }
    }
    questoes.innerHTML +=`</div>
    </div>`
    
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
