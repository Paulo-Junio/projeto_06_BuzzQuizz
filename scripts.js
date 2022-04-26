let titles="";
let images="";
let qtPerg;
let qtNiveis;
let textopergunta;
let corpergunta;
let textocorreta;
let imagemcorreta;
let textoincorreta1;
let imagemincorreta1;
let textoincorreta2;
let imagemincorreta2;
let textoincorreta3;
let imagemincorreta3;
let tituloNivel;
let porcentmin;
let urlnivel;
let descrinivel;
let cont=0;
let testeIniciado=1;
let idDoNivel;
let quizzesCriado=[];
let questoesUsuario=[]
let niveisUsuaro=[]
let quizUsuario= {title:'', image:'', questions:questoesUsuario,levels:niveisUsuaro}
let numero= 1;
let idGerado;

//FORMULÁRIO

// Renderizar próxima página:
function abrirForms() {
  document.querySelector(".main").classList.add("hidden");
  document.querySelector(".main2").classList.remove("hidden");
  let boxgeral = document.querySelector(".box-info-geral");
  boxgeral.innerHTML = `
  <input class="inputbox titulo" type="text" placeholder="   Título do seu quizz" value="" />
  <input class="inputbox url" type="text" placeholder="   URL da imagem do seu quizz" value="" />
  <input class="inputbox qtPerg" type="text" placeholder=" Quantidade de perguntas do quizz" value="" />
  <input class="inputbox qtNiveis" type="text" placeholder="   Quantidade de níveis do quizz" value="" />
  `;
}

function renderizarBoxPerguntas() {
  let container2 = document.querySelector(".perguntas2");
  qtPerg = document.querySelector(".qtPerg").value;
  for (let i = 0; i < qtPerg; i++) {
    container2.innerHTML += `
    <div class="box-perguntas listapergunta" id=${i + 1}>
  
       <p> Pergunta ${i + 1} </p>
        <input class="inputbox textopergunta" type="text" placeholder="   Texto da pergunta" value="" />
        <input class="inputbox corpergunta" type="text" placeholder="   Cor de fundo da pergunta" value="" />
  
        <p> Resposta correta </p>
        <input class="inputbox textocorreta" type="text" placeholder="   Resposta correta" value="" />
        <input class="inputbox imagemcorreta" type="text" placeholder="   URL da imagem" value="" />
      
        <p> Respostas incorretas </p>
        <input class="inputbox textoincorreta1" type="text" placeholder="   Resposta incorreta: 1" value="" />
        <input class="inputbox imagemincorreta1" type="text" placeholder="   URL da imagem: 1" value="" />
        <input class="inputbox textoincorreta2" type="text" placeholder="   Resposta incorreta: 2" value="" />
        <input class="inputbox imagemincorreta2" type="text" placeholder="   URL da imagem: 2" value="" />
        <input class="inputbox textoincorreta3" type="text" placeholder="   Resposta incorreta: 3" value="" />
        <input class="inputbox imagemincorreta3" type="text" placeholder="   URL da imagem: 3" value="" />
      
        </div>
        `;
  }
  prosseguirPerg()
}

function prosseguirPerg() {
  titles = document.querySelector(".titulo").value;
  images = document.querySelector(".url").value;
  qtNiveis = document.querySelector(".qtNiveis").value;
  testeTituloQuizz();
}
  //Validar título:
function testeTituloQuizz() {
  if (titles.length < 20 || titles.length > 65) {
    alert("Seu título precisar ter entre 20-65 caracteres.");
    container2 = "";
  } else {
    quizUsuario.title=titles;
    testeURL();
  }
}

//Validar URL:
function testeURL() {
  if (isvalidURL(images)) {
    quizUsuario.image=images;
    testeqtPerg();
  } else {
    alert("Url invalida");
    container2 = "";
  }
}

//Validar quantidade de perguntas:
function testeqtPerg() {
  if (typeof parseInt(qtPerg) == "number" && parseInt(qtPerg) >= 3) {
    testeNiveis();
  } else {
    alert("Você precisa fazer ao menos 3 perguntas.");
    container2 = "";
  }
}

//Validar quantidade de níveis:
function testeNiveis() {
  if (typeof parseInt(qtNiveis) == "number" && parseInt(qtNiveis) >= 2) {
    document.querySelector(".main2").classList.add("hidden");
    document.querySelector(".main3").classList.remove("hidden");
  } else {
    alert("Você precisa fazer ao menos 2 níveis.");
    container2 = "";
  }
}

// AQUI COMECA A VALIDAÇÃO DO FORMULARIO DE PERGUNTAS
// ESTAFUNÇÃO CHAMA UM DE CADA VEZ PARA VALIDAR, PASSANDO O ID COMO REFERENCIA
function validarFomularioDePerguntas() {
  let quantidadeValidacoes = cont;
  testeIniciado =1;
  if (cont<qtPerg) {
    let idPerguntas= (cont+1)
    prosseguirNiv(idPerguntas)
  }
}


//ESTA FUNÇÃO FAZ A VALIDAÇÃO DE CADA UMA DAS CAIXAS DE PERGUNTAS SEPARADAMENTE
function prosseguirNiv(idPerguntas) {
  let elemento = document.getElementById(idPerguntas)
  textopergunta = elemento.querySelector(".textopergunta").value;
  corpergunta = elemento.querySelector(".corpergunta").value;
  textocorreta = elemento.querySelector(".textocorreta").value;
  imagemcorreta = elemento.querySelector(".imagemcorreta").value;
  textoincorreta1 = elemento.querySelector(".textoincorreta1").value;
  imagemincorreta1 = elemento.querySelector(".imagemincorreta1").value;
  textoincorreta2 = elemento.querySelector(".textoincorreta2").value;
  imagemincorreta2 = elemento.querySelector(".imagemincorreta2").value;
  textoincorreta3 = elemento.querySelector(".textoincorreta3").value;
  imagemincorreta3 = elemento.querySelector(".imagemincorreta3").value;

  let perguntasNodeList = document.querySelectorAll(".listapergunta");
  let arrayperg = Array.from(perguntasNodeList);

  arrayperg.forEach(testesPerguntas)
   //Funções de Validação:
  function testesPerguntas(){
      // 1)Validar nº caracteres do título:
      function testePerg() {
        if (textopergunta.length < 20) {
          alert("Sua pergunta precisa ter no mínimo 20 caracteres.");
        } else {
          testeCor();
        }
      }
      if (testeIniciado === 1){
        testePerg();
        testeIniciado += 1;
      }
      // 2)Validar cores:
      function testeCor() {
        function isValidHex(corpergunta) {
          if (!corpergunta || typeof corpergunta !== "string") return false;

          if (corpergunta.substring(0, 1) === "#")
            corpergunta = corpergunta.substring(1);

          switch (corpergunta.length) {
            case 3:
              return /^[0-9A-F]{3}$/i.test(corpergunta);
            case 6:
              return /^[0-9A-F]{6}$/i.test(corpergunta);
            case 8:
              return /^[0-9A-F]{8}$/i.test(corpergunta);
            default:
              return false;
          }
          return false;
        }
        if (isValidHex(corpergunta)) {
          testeTexto();
        } else {
          alert("Adicione cor hexadecimal.");
        }
      }

      // 3)Validar respostas:
      function testeTexto() {
        if (
          textocorreta == "" ||
          textoincorreta1 == "" ||
          textoincorreta2 == "" ||
          textoincorreta3 == ""
        ) {
          alert("insira texto");
        } else {
          testeImgInco();
        }
      }

      // 4) Validar URL:
      function testeImgInco() {
        if (
          isvalidURL(imagemcorreta) &&
          isvalidURL(imagemincorreta1) &&
          isvalidURL(imagemincorreta2) &&
          isvalidURL(imagemincorreta3)
        ) {
          cont +=1
          adicionarEmQuestions()
        
        } else {
          alert("Insira URL válida");
        }
        if (idPerguntas === (qtPerg-1)) {
          cont=0
          renderizarNiveis();
        }
      }
    ; //Fim das funções de validação.
  }
}

function adicionarEmQuestions(){
  let objeto= {
    title: textopergunta,
    color: corpergunta,
    answers: [{text:textoincorreta1,
      image:imagemincorreta1,
      isCorrectAnswer:false
    },
      {text: textocorreta,
        image:imagemcorreta,
        isCorrectAnswer:true},
      {text: textoincorreta1,
        image:textoincorreta2,
        isCorrectAnswer:false
      },
      {text: textoincorreta3,
        image:imagemincorreta3,
        isCorrectAnswer:false
      }
    ]
  }
  questoesUsuario.push(objeto)
  validarFomularioDePerguntas()
}
//ESTA FUNCAO RENDERIZA O FORMULARIO DE NIVEL DA PROXIMA PAGINA
function renderizarNiveis() {
  let container2 = document.querySelector(".niveis");
  document.querySelector(".main3").classList.add("hidden");
  document.querySelector(".main4").classList.remove("hidden");
  for (let i = 0; i < qtNiveis; i++) {
    container2.innerHTML += `
    <div class="box-perguntas nivel" id=${"n"+i}>
    <p> Nivel ${i + 1} </p>
    <input class="inputbox titulonivel" type="text" placeholder="   Título do nível" value="" />
    <input class="inputbox porcentmin" type="text" placeholder="   % de acerto mínima" value="" />
    <input class="inputbox urlnivel" type="text" placeholder="   URL da imagem do nível" value="" />
    <input class="inputbox descrinivel" type="text" placeholder="   Descrição do nível" value="" />
    </div>
    `;
  }
}

function validarNiveis() {
  let quantidadeValidacoes = cont;
  testeIniciado =1;
  if (cont<qtNiveis) {
    let idNivel= ("n" + cont)
    idDoNivel= (cont);
    finalizarQuizz(idNivel)
  }
}

function finalizarQuizz(idNivel) {
  let nivelVerificado = document.getElementById(idNivel);
  tituloNivel = nivelVerificado.querySelector(".titulonivel").value;
  porcentmin = nivelVerificado.querySelector(".porcentmin").value;
  urlnivel = nivelVerificado.querySelector(".urlnivel").value;
  descrinivel = nivelVerificado.querySelector(".descrinivel").value;

  //Validar título do nível:
  function testeTituloNivel() {
    if (tituloNivel.length < 10) {
      alert("Sua pergunta precisa ter no mínimo 10 caracteres.");
    } else {
      testePorcent();
    }
  }
  if (testeIniciado === 1){
      testeTituloNivel();
  }

  //Validar %:
  function testePorcent() {
    //merge com valor do outro script
    if (porcentmin >= 0 && porcentmin < 100 && porcentmin !=="") {
      testeUrlNivel();
    } else {
      alert("Adicione uma porcentagem válida");
    }
  }

  //Validar url do nível:
  function testeUrlNivel() {
    if (isvalidURL(urlnivel)) {
      testeDescri();
    } else {
      alert("Adicione uma URL válida");
    }
  }

  //Validar desc do nível:
  function testeDescri() {
    if (descrinivel.length < 30) {
      alert("Sua descrição precisa ter no mínimo 30 caracteres.");
    } 
    else {
      cont +=1
      adicionarEmLevels()
    } 
    if (idDoNivel === (qtNiveis-1)  && descrinivel!=="") {
      cont=0
      enviarQuizDoUsuario();
    }
  }
}

function adicionarEmLevels() {
  let objeto= {
    title: tituloNivel,
    image: urlnivel,
    text:descrinivel,
    minValue:porcentmin
  }
  niveisUsuaro.push(objeto)
  validarNiveis()
}

function enviarQuizDoUsuario() {
  console.log("VOU MANDAR O QUIZ EIIMMM")
  if (numero ===1){
    let enviarQuiz = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",quizUsuario)
    enviarQuiz.then(finalizarCriacao)
    numero=2;
  }
}

function finalizarCriacao(resposta) {
  idGerado = resposta.data.id;
  quizzesCriado.push(idGerado)
  document.querySelector(".main4").classList.add("hidden");
  document.querySelector(".main5").classList.remove("hidden");
  let container2 = document.querySelector(".box-img");
  container2.innerHTML = `<img class="img-quizz"
  src="${images}"/>
  <div class="texto-fim">
  ${titles}
  </div>
  `;
}

function acessarQuizz() {
  buscarQuizz(idGerado)
}

function home() {
  window.location.reload();
}

function isvalidURL(parametro) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(parametro);
}



//buscarQuizz()

function buscarAPI() {
  let promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
  promise.then(renderizarLista)
}

function renderizarLista(resposta) {
  let topoPagina = document.querySelector(".main");
  if (quizzesCriado.length ===0) {
    topoPagina.innerHTML += `
    <div class="quizzes-user">
      <div class="naoCriou">
        Você não criou nenhum quizz ainda :(
      </div>

      <button class="btn-criar" onclick="abrirForms()">Criar Quizz</button>
    </div>
    <!-- fecha quizz-user -->`
  }
  else if (quizzesCriado.length !== 0) {
    topoPagina.innerHTML += `<!--EXIBIR QUIZ DO USUARIO-->
    <div class="quizz-user2">
      <div class="h2">
        <button onclick="abrirForms()"><strong>Seus Quizzes</strong></button>
        <button onclick="abrirForms()">
          <ion-icon class="addicon" name="add-circle"></ion-icon>
        </button>
      </div>

      <div class="icons">
        <div class="quizz-icon">
          <img class="img-quizzsite"
            src="https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg?t=1646676032" alt="" />
          <div class="texto">
            O texto entra aqui…
          </div>
        </div>
        <div class="quizz-icon">
          <img class="img-quizzsite"
            src="https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg?t=1646676032" alt="" />
          <div class="texto">
            O texto entra aqui…
          </div>
        </div>
      </div>
    </div>
    <!--quizz-user2-->
    <!--EXIBIR OS QUIZ DA API-->`
  }
  let quizzes = resposta.data;
    topoPagina.innerHTML += `<div class="quizzes-site">
    <div class="h2">
      Todos os Quizzes
    </div>

    <div class="icons">

    </div>
  </div>`
  let lista = document.querySelector(".quizzes-site .icons");
  for (let i=0; i<quizzes.length; i++){
      lista.innerHTML += `<div id ="${quizzes[i].id}" class="quizz-icon" onclick="buscarQuizz(this)">
      <img src="${quizzes[i].image}"/>
      <div class="texto">
        ${quizzes[i].title}
      </div>
    </div>`
  }
}

buscarAPI()


//ENVIAR QUIZ PRO SERVIDOR
function postQuiz(){
  
  let formulario = {
    title: title,
    image: image,
    questions: [
      {
        title: textopergunta,
        color: corpergunta,
        answers: [
          {
            text: textocorreta,
            image: imagemcorreta,
            isCorrectAnswer: true
          },
          {
            text: textoincorreta1,
            image: imagemincorreta1,
            isCorrectAnswer: false
          },
          {
            text: textoincorreta2,
            image: imagemincorreta2,
            isCorrectAnswer: false
          },
          {
            text: textoincorreta3,
            image: imagemincorreta3,
            isCorrectAnswer: false
          }
        ]
      }
    ],
    levels: [
      {
        title: tituloNivel,
        image: urlnivel,
        text: descrinivel,
        minValue: porcentmin
      }
    ]
  }

  let promise = axios.post('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes', formulario)

    promise.then(quandoSucesso);
      function quandoSucesso(){
        console.log("Foi pro servidor!")
      }
    }