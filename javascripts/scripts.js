let title;
let image;
let qtPerg;
let qtNiveis;



//FORMULÁRIO

function abrirForms() {
  document.querySelector(".main").classList.add("hidden");
  document.querySelector(".main2").classList.remove("hidden")
  let boxgeral = document.querySelector(".box-info-geral");
  boxgeral.innerHTML = `
  <input class="inputbox titulo" type="text" placeholder="   Título do seu quizz" value="" />
  <input class="inputbox url" type="text" placeholder="   URL da imagem do seu quizz" value="" />
  <input class="inputbox qtPerg" type="text" placeholder=" Quantidade de perguntas do quizz" value="" />
  <input class="inputbox qtNiveis" type="text" placeholder="   Quantidade de níveis do quizz" value="" />
  `
}

function prosseguirPerg() {
  title = document.querySelector(".titulo").value;
  image = document.querySelector(".url").value;
  qtPerg = document.querySelector(".qtPerg").value;
  qtNiveis = document.querySelector(".qtNiveis").value;
  

  function testeTitulo(){
    if(title.length<20 ||title.length>65){
      alert ("Seu título precisar ter entre 20-65 caracteres.")
    }else{
    testeURL()
    }
  }
  testeTitulo()


  function testeURL(){       
    function isvalidURL(image) {
      var pattern = new RegExp('^(https?:\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
        '(\\#[-a-z\\d_]*)?$','i'); 
      return !!pattern.test(image); 
    }

    if (isvalidURL(image)){
      testeqtPerg()
    }else{
      alert ("Url invalida")
    }
  }

  function testeqtPerg(){
    if(typeof parseInt(qtPerg) == "number" && parseInt(qtPerg) >=3){
      testeNiveis()
    }else{
      alert ("Você precisa fazer ao menos 3 perguntas.")
    }
  }

  function testeNiveis(){
    if(typeof parseInt(qtNiveis) == "number" && parseInt(qtNiveis) >=2){
      document.querySelector(".main2").classList.add("hidden");
      document.querySelector(".main3").classList.remove("hidden")
    }else{
      alert ("Você precisa fazer ao menos 2 níveis.")
    }
  }



  let container = document.querySelector(".perguntas");

  for (let i = 0; i < qtPerg; i++) {

    container.innerHTML += `
    <div class="box-perguntas">
  
       <p> Pergunta ${i+1} </p>
        <input class="inputbox" type="text" placeholder="   Texto da pergunta" value="" />
        <input class="inputbox" type="text" placeholder="   Cor de fundo da pergunta" value="" />
  
  
        <p> Resposta correta </p>
        <input class="inputbox" type="text" placeholder="   Resposta correta" value="" />
        <input class="inputbox" type="text" placeholder="   URL da imagem" value="" />
      
        <p> Respostas incorretas </p>
        <input class="inputbox" type="text" placeholder="   Resposta incorreta: 1" value="" />
        <input class="inputbox" type="text" placeholder="   URL da imagem: 1" value="" />
        <input class="inputbox" type="text" placeholder="   Resposta incorreta: 2" value="" />
        <input class="inputbox" type="text" placeholder="   URL da imagem: 2" value="" />
        <input class="inputbox" type="text" placeholder="   Resposta incorreta: 3" value="" />
        <input class="inputbox" type="text" placeholder="   URL da imagem: 3" value="" />
      
        </div>
    `
  }
}

function prosseguirNiv() {

  document.querySelector(".main3").classList.add("hidden");
  document.querySelector(".main4").classList.remove("hidden")
  
  let container = document.querySelector(".niveis");

  for (let i = 0; i < qtNiveis; i++) {

    container.innerHTML += `
    <div class="box-perguntas nivel">

    <p> Nivel ${i+1} </p>
    <input class="inputbox" type="text" placeholder="   Título do nível" value="" />
    <input class="inputbox" type="text" placeholder="   % de acerto mínima" value="" />
    <input class="inputbox" type="text" placeholder="   URL da imagem do nível" value="" />
    <input class="inputbox" type="text" placeholder="   Descrição do nível" value="" />

    </div>
    ` 
  }
}

function finalizarQuizz() {
  
  document.querySelector(".main4").classList.add("hidden");
  document.querySelector(".main5").classList.remove("hidden")

  let container = document.querySelector(".box-img");

  container.innerHTML = `<img class="img-quizz"
  src="https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg?t=1646676032" alt="" />
  <div class="texto-fim">
  ${title}
  </div>
  `

}

function acessarQuizz() {
  alert("leva ao link do quizz?");
}

function home() {
  document.querySelector(".main5").classList.add("hidden");
  document.querySelector(".main").classList.remove("hidden")
}