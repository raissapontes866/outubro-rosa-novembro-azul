
// MENU RESPONSIVO

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    const aberto = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", aberto);
    menuToggle.textContent = aberto ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// QUIZ INTERATIVO

const perguntas = [
    {
        pergunta: "1. O câncer de mama também pode atingir homens?",
        respostas: ["Sim", "Não", "Nunca"],
        correta: 0,
        explicacao: "Correto! Embora seja raro, homens também podem desenvolver câncer de mama."
    },
    {
        pergunta: "2. O câncer de próstata pode não apresentar sintomas no início?",
        respostas: ["Não", "Sim", "Somente em idosos"],
        correta: 1,
        explicacao: "Isso mesmo! A doença pode não apresentar sintomas nas fases iniciais."
    },
    {
        pergunta: "3. Qual é a cor que representa o Outubro Rosa?",
        respostas: ["Azul", "Verde", "Rosa"],
        correta: 2,
        explicacao: "Muito bem! A cor rosa representa a campanha de conscientização sobre o câncer de mama."
    },
    {
        pergunta: "4. Qual é a cor que representa o Novembro Azul?",
        respostas: ["Azul", "Amarelo", "Vermelho"],
        correta: 0,
        explicacao: "Correto! O azul representa a campanha Novembro Azul."
    },
    {
        pergunta: "5. O acompanhamento médico é importante para a saúde?",
        respostas: ["Não", "Sim", "Somente quando existe dor"],
        correta: 1,
        explicacao: "Exatamente! O acompanhamento médico ajuda a orientar os cuidados necessários."
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondida = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function mostrarPergunta() {
    respondida = false;

    const pergunta = perguntas[perguntaAtual];

    questionElement.textContent = pergunta.pergunta;
    answersElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.disabled = true;

    pergunta.respostas.forEach((resposta, index) => {
        const botao = document.createElement("button");

        botao.textContent = resposta;
        botao.classList.add("answer-btn");

        botao.addEventListener("click", () => {
            verificarResposta(index, botao);
        });

        answersElement.appendChild(botao);
    });

    scoreElement.textContent = "";
}

function verificarResposta(indice, botaoSelecionado) {
    if (respondida) return;

    respondida = true;

    const pergunta = perguntas[perguntaAtual];
    const botoes = answersElement.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === pergunta.correta) {
        pontuacao++;
        botaoSelecionado.classList.add("correct");
        feedbackElement.textContent = "Muito bem! " + pergunta.explicacao;
    } else {
        botaoSelecionado.classList.add("wrong");
        botoes[pergunta.correta].classList.add("correct");
        feedbackElement.textContent =
            "Não foi dessa vez! " + pergunta.explicacao;
    }

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    questionElement.textContent = "Quiz finalizado! 🎉";
    answersElement.innerHTML = "";
    feedbackElement.textContent =
        "Você concluiu o desafio de conscientização!";

    nextButton.textContent = "Refazer quiz";
    nextButton.disabled = false;

    scoreElement.textContent =
        "Sua pontuação: " + pontuacao + " de " + perguntas.length;

    nextButton.onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;

    nextButton.textContent = "Próxima pergunta";
    nextButton.onclick = null;

    mostrarPergunta();
}

mostrarPergunta();
