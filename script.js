// Lista de perguntas e respostas
const perguntas = [
    {
      pergunta: "Quem dirigiu o filme 'Titanic'?",
      respostas: [
        { opcao: "Steven Spielberg", correto: false },
        { opcao: "James Cameron", correto: true },
        { opcao: "Christopher Nolan", correto: false }
      ]
    },
    {
      pergunta: "Em qual ano foi lançado 'Senhor dos Anéis: A Sociedade do Anel'?",
      respostas: [
        { opcao: "2001", correto: true },
        { opcao: "1999", correto: false },
        { opcao: "2003", correto: false }
      ]
    },
    {
      pergunta: "Qual série tem os personagens Eleven e Demogorgon?",
      respostas: [
        { opcao: "The Boys", correto: false },
        { opcao: "Stranger Things", correto: true },
        { opcao: "Dark", correto: false }
      ]
    }
  ];
  
  // Pegando elementos do HTML
  const perguntaElemento = document.querySelector(".pergunta");
  const respostasElemento = document.querySelector(".respostas");
  const progressoElemento = document.querySelector(".progresso");
  const textoFinal = document.querySelector(".fim span");
  const conteudo = document.querySelector(".conteudo");
  const conteudoFinal = document.querySelector(".fim");
  const timerElemento = document.getElementById("tempo");
  
  let indiceAtual = 0;
  let acertos = 0;
  let tempo = 10;
  let intervalo;
  
  // Carregar uma nova pergunta
  function carregarPergunta() {
    limparTimer();
    tempo = 10;
    atualizarTimer();
  
    const perguntaAtual = perguntas[indiceAtual];
    progressoElemento.innerHTML = `Pergunta ${indiceAtual + 1}/${perguntas.length}`;
    perguntaElemento.innerHTML = perguntaAtual.pergunta;
    respostasElemento.innerHTML = "";
  
    perguntaAtual.respostas.forEach((resposta) => {
      const botao = document.createElement("button");
      botao.classList.add("botao-resposta");
      botao.innerText = resposta.opcao;
  
      botao.onclick = () => {
        const botoes = document.querySelectorAll(".botao-resposta");
        botoes.forEach(btn => btn.disabled = true);
  
        if (resposta.correto) {
          botao.classList.add("correta");
          acertos++;
        } else {
          botao.classList.add("errada");
        }
  
        setTimeout(() => {
          indiceAtual++;
          if (indiceAtual < perguntas.length) {
            carregarPergunta();
          } else {
            finalizarJogo();
          }
        }, 1000);
      };
  
      respostasElemento.appendChild(botao);
    });
  
    iniciarTimer();
  }
  
  // Timer para responder
  function iniciarTimer() {
    intervalo = setInterval(() => {
      tempo--;
      atualizarTimer();
  
      if (tempo === 0) {
        clearInterval(intervalo);
        indiceAtual++;
        if (indiceAtual < perguntas.length) {
          carregarPergunta();
        } else {
          finalizarJogo();
        }
      }
    }, 1000);
  }
  
  function atualizarTimer() {
    timerElemento.innerText = tempo;
  }
  
  function limparTimer() {
    clearInterval(intervalo);
  }
  
  // Finalizar o quiz
  function finalizarJogo() {
    limparTimer();
    conteudo.style.display = "none";
    conteudoFinal.style.display = "flex";
    textoFinal.innerHTML = `Você acertou ${acertos} de ${perguntas.length}!`;
  }
  
  // Reiniciar o quiz
  function reiniciarQuiz() {
    indiceAtual = 0;
    acertos = 0;
    conteudo.style.display = "block";
    conteudoFinal.style.display = "none";
    carregarPergunta();
  }
  
  // Iniciar o quiz
  carregarPergunta();