// ===== Efeito de digitação =====
// A referência só permite ler este cargo por completo.
// Para alternar entre vários, adicione outros textos à lista.
const roles = [
  "Ciência da Computação",
  "Web Front-End",
  "Modelagem de Dados",
  "Pensamento Computacional",
  "Engenharia de Prompt",
];

const typingElement = document.getElementById("typing-text");

const TYPING_SPEED = 110;
const DELETING_SPEED = 60;
const PAUSE_FULL_TEXT = 1500;
const PAUSE_EMPTY_TEXT = 500;

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];

    charIndex += isDeleting ? -1 : 1;
    typingElement.textContent = currentRole.slice(0, charIndex);

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        delay = PAUSE_FULL_TEXT;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = PAUSE_EMPTY_TEXT;
    }

    setTimeout(typeRole, delay);
}

setTimeout(typeRole, PAUSE_EMPTY_TEXT);

// ===== Link ativo da navbar conforme a rolagem =====
const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".navbar__link");

function updateActiveLink() {
    // A seção ativa é a última que passou de um terço da tela
    const referenceLine = window.innerHeight / 3;
    let currentId = sections[0].id;

    sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= referenceLine) {
            currentId = section.id;
        }
    });

    // No fim da página, a última seção (Contato) permanece ativa
    const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (reachedBottom) {
        currentId = sections[sections.length - 1].id;
    }

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
updateActiveLink();

// ===== Links sem destino definido =====
// Impede que um href="#" leve a página de volta ao topo
document.querySelectorAll("[data-placeholder]").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
});

// ===== Formulário =====
// Envio simulado: nenhum dado é enviado de verdade
const contactForm = document.getElementById("contact-form");
const formFeedback = document.getElementById("form-feedback");
let feedbackTimer;

// Ao clicar no botão, o "submit" só acontece se a validação dos campos passar
contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // impede o recarregamento da página

    contactForm.reset(); // limpa todos os campos
    formFeedback.textContent = "Mensagem enviada com sucesso!";

    // Remove o aviso após 4 segundos
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => {
        formFeedback.textContent = "";
    }, 4000);
});
