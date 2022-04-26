let title;
let image;
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

function prosseguirPerg() {
  title = document.querySelector(".titulo").value;
  image = document.querySelector(".url").value;
  qtPerg = document.querySelector(".qtPerg").value;
  qtNiveis = document.querySelector(".qtNiveis").value;

  //Validar título:
  function testeTituloQuizz() {
    if (title.length < 20 || title.length > 65) {
      alert("Seu título precisar ter entre 20-65 caracteres.");
      container2 = "";
    } else {
      testeURL();
    }
  }
  testeTituloQuizz();

  //Validar URL:
  function testeURL() {
    if (isvalidURL(image)) {
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

  // Renderizar próxima página:
  let container2 = document.querySelector(".perguntas2");
  for (let i = 0; i < qtPerg; i++) {
    container2.innerHTML += `
    <div class="box-perguntas listapergunta">
  
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
}

function prosseguirNiv() {
  textopergunta = document.querySelector(".textopergunta").value;
  corpergunta = document.querySelector(".corpergunta").value;
  textocorreta = document.querySelector(".textocorreta").value;
  imagemcorreta = document.querySelector(".imagemcorreta").value;
  textoincorreta1 = document.querySelector(".textoincorreta1").value;
  imagemincorreta1 = document.querySelector(".imagemincorreta1").value;
  textoincorreta2 = document.querySelector(".textoincorreta2").value;
  imagemincorreta2 = document.querySelector(".imagemincorreta2").value;
  textoincorreta3 = document.querySelector(".textoincorreta3").value;
  imagemincorreta3 = document.querySelector(".imagemincorreta3").value;

  //Funções de Validação:
  function testesPerguntas() {
    // 1)Validar nº caracteres do título:
    function testePerg() {
      if (textopergunta.length < 20) {
        alert("Sua pergunta precisa ter no mínimo 20 caracteres.");
      } else {
        testeCor();
      }
    }
    testePerg();

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
        alert("url ok");
        document.querySelector(".main3").classList.add("hidden");
        document.querySelector(".main4").classList.remove("hidden");
      } else {
        alert("Insira URL válida");
      }
    }
  }
  testesPerguntas(); //Fim das funções de validação.

  //Transformar NodeList em Array
  let perguntasNodeList = document.querySelectorAll(".listapergunta");
  let arrayperg = Array.from(perguntasNodeList);
  console.log(arrayperg);

  //Aplicar validações na Array:
  const arrayVerificada = arrayperg.map(testesPerguntas);
  console.log(arrayVerificada);

  // Renderizar próxima página:
  let container2 = document.querySelector(".niveis");
  for (let i = 0; i < qtNiveis; i++) {
    container2.innerHTML += `
    <div class="box-perguntas nivel">
    <p> Nivel ${i + 1} </p>
    <input class="inputbox titulonivel" type="text" placeholder="   Título do nível" value="" />
    <input class="inputbox porcentmin" type="text" placeholder="   % de acerto mínima" value="" />
    <input class="inputbox urlnivel" type="text" placeholder="   URL da imagem do nível" value="" />
    <input class="inputbox descrinivel" type="text" placeholder="   Descrição do nível" value="" />
    </div>
    `;
  }
}

function finalizarQuizz() {
  tituloNivel = document.querySelector(".titulonivel").value;
  porcentmin = document.querySelector(".porcentmin").value;
  urlnivel = document.querySelector(".urlnivel").value;
  descrinivel = document.querySelector(".descrinivel").value;

  //Validar título do nível:
  function testeTituloNivel() {
    if (tituloNivel.length < 10) {
      alert("Sua pergunta precisa ter no mínimo 10 caracteres.");
    } else {
      testePorcent();
    }
  }
  testeTituloNivel();

  //Validar %:
  function testePorcent() {
    //merge com valor do outro script
    if (porcentmin > 0 && porcentmin < 100) {
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
    } else {
      alert("fim");
    }
  }

  // document.querySelector(".main4").classList.add("hidden");
  // document.querySelector(".main5").classList.remove("hidden");

  let container2 = document.querySelector(".box-img");

  container2.innerHTML = `<img class="img-quizz"
  src="https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg?t=1646676032" alt="" />
  <div class="texto-fim">
  ${title}
  </div>
  `;
}

function acessarQuizz() {
  alert("leva ao link do quizz?");
}

function home() {
  document.querySelector(".main5").classList.add("hidden");
  document.querySelector(".main").classList.remove("hidden");
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
  let quizzes = resposta.data;
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