const botaoTema = document.getElementById("btn-tema");

function alternarTema() {
  document.body.classList.toggle("escuro");
}

botaoTema.addEventListener("click", alternarTema);

const trilho = document.getElementById("trilho-projetos");
const btnAnterior = document.getElementById("btn-anterior");
const btnProximo = document.getElementById("btn-proximo");
const cards = trilho.querySelectorAll(".card");
let indiceProjetoAtual = 0;

function mostrarProjeto(indice) {
  indiceProjetoAtual = Math.max(0, Math.min(indice, cards.length - 1));
  const posicao =
    cards[indiceProjetoAtual].getBoundingClientRect().left -
    trilho.getBoundingClientRect().left +
    trilho.scrollLeft;

  trilho.scrollTo({ left: posicao, behavior: "smooth" });
  btnAnterior.disabled = indiceProjetoAtual === 0;
  btnProximo.disabled = indiceProjetoAtual === cards.length - 1;
}

btnProximo.addEventListener("click", () => mostrarProjeto(indiceProjetoAtual + 1));
btnAnterior.addEventListener("click", () => mostrarProjeto(indiceProjetoAtual - 1));

mostrarProjeto(indiceProjetoAtual);

function animarBarras() {
  document.querySelectorAll(".nivel").forEach((barra) => {
    barra.style.width = barra.dataset.nivel + "%";
  });
}

const secaoSkills = document.getElementById("skills");

const observadorSkills = new IntersectionObserver(
  (entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animarBarras();
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.25 }
);

observadorSkills.observe(secaoSkills);

const formulario = document.getElementById("form-contato");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoMensagem = document.getElementById("mensagem");
const retornoFormulario = document.getElementById("retorno-formulario");

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = campoNome.value.trim();
  const email = campoEmail.value.trim();
  const mensagem = campoMensagem.value.trim();

  [campoNome, campoEmail, campoMensagem].forEach((campo) => {
    campo.removeAttribute("aria-invalid");
  });

  if (!nome) {
    campoNome.setAttribute("aria-invalid", "true");
    retornoFormulario.textContent = "Preencha seu nome.";
    campoNome.focus();
    return;
  }

  if (!email) {
    campoEmail.setAttribute("aria-invalid", "true");
    retornoFormulario.textContent = "Preencha seu e-mail.";
    campoEmail.focus();
    return;
  }

  if (!campoEmail.checkValidity()) {
    campoEmail.setAttribute("aria-invalid", "true");
    retornoFormulario.textContent = "Digite um e-mail válido.";
    campoEmail.focus();
    return;
  }

  if (!mensagem) {
    campoMensagem.setAttribute("aria-invalid", "true");
    retornoFormulario.textContent = "Escreva sua mensagem.";
    campoMensagem.focus();
    return;
  }

  retornoFormulario.textContent =
    `Obrigado, ${nome}! Sua mensagem foi registrada nesta demonstração.`;

  formulario.reset();
});