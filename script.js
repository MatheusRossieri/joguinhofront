const palavras = ["Abelha", "Brisa", "Carta", "Dedal", "Exato",
"Fardo", "Ganso", "Hotel", "Idade", "Junto",
"Karma", "Lente", "Mente", "Naval", "Orgão",
"Prato", "Queda", "Rosto", "Sabor", "Tinto",
"União", "Velho", "Wafle", "Xadrez", "Yatch",
"Zebra", "Âmbar", "Ébano", "Ícone", "Ômega",
"Útil", "Viado", "Balão", "Canto", "Fenda",
"Gruta", "Harpa", "Infer", "Junto", "Lápis",
"Massa", "Nobre", "Opaco", "Prece", "Quilo",
"Ramos", "Sinto", "Traço", "Urubu", "Vagar"];
let palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];
let tentativas = 0;
const maxTentativas = 6;
let jogoTerminado = false;

const jogoEl = document.getElementById('jogo');
const palpiteInput = document.getElementById('palpite');
const tentarBtn = document.getElementById('tentar');
const mensagemEl = document.getElementById('mensagem');

function criarGrid() {
  for (let i = 0; i < maxTentativas; i++) {
    for (let j = 0; j < 5; j++) {
      let letraEl = document.createElement('div');
      letraEl.classList.add('letra');
      jogoEl.appendChild(letraEl);
    }
  }
}

function atualizarGrid(palpite) {
  let letras = jogoEl.querySelectorAll('.letra');
  let indiceInicial = tentativas * 5;

  for (let i = 0; i < 5; i++) {
    let letra = palpite[i] || "";
    let classe = 'incorreta';

    if (palavraSecreta[i] === letra) {
      classe = 'correta';
    } else if (palavraSecreta.includes(letra)) {
      classe = 'existe';
    }

    letras[indiceInicial + i].textContent = letra;
    letras[indiceInicial + i].classList.add(classe);
  }
}

function verificarPalpite() {
  if (jogoTerminado) return; 

  let palpite = palpiteInput.value.toLowerCase();

  if (palpite.length !== 5) {
    mensagemEl.textContent = "Digite uma palavra com 5 letras!";
    return;
  }

  atualizarGrid(palpite);
  tentativas++;

  if (palpite === palavraSecreta) {
    mensagemEl.textContent = "Parabéns, você acertou!";
    jogoTerminado = true;
  } else if (tentativas >= maxTentativas) {
    mensagemEl.textContent = `Você perdeu! A palavra era ${palavraSecreta}`;
    jogoTerminado = true;
  } else {
    mensagemEl.textContent = "";
  }

  palpiteInput.value = "";
}

criarGrid();

tentarBtn.addEventListener('click', verificarPalpite);

palpiteInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    verificarPalpite();
  }
});
