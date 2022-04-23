let title;
let image;
let qtPerg;
let qtNiveis;



//FORMULÁRIO

function abrirForms() {
  document.querySelector(".main").classList.add("hidden");
  document.querySelector(".main2").classList.remove("hidden")
 let boxgeral = document.querySelector(".box-info-geral");
 boxgeral.innerHTML=`
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

  console.log(title)

  document.querySelector(".main2").classList.add("hidden");
  document.querySelector(".main3").classList.remove("hidden")
}

function prosseguirNiv() {
    alert("salva infos + abre pagina de niveis");
}
  
function finalizarQuizz() {
   alert("salva infos + abre pagina de niveis");
}

function acessarQuizz(){
  alert("leva ao link do quizz?");
}

function home(){
  alert ("volta pro main1")
}