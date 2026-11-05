// Configuração da contagem regressiva para 14 de Novembro às 21:00
function updateCountdown() {
    const now = new Date();
    let targetYear = now.getFullYear();
    let eventDate = new Date(targetYear, 10, 14, 21, 0, 0); // Mês 10 = Novembro (0-indexado)

    // Se já passou de 14/11 neste ano, aponta para o próximo
    if (now > eventDate) {
        eventDate = new Date(targetYear + 1, 10, 14, 21, 0, 0);
    }

    const diff = eventDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Interação do botão "Virar Dose de Pinga" + Tremor de Som Automotivo
const shotBtn = document.getElementById('shot-btn');
const shotCountEl = document.getElementById('shot-count');
const particlesContainer = document.getElementById('particles-container');
let shots = 0;

const icons = ['🥃', '🔥', '🔊', '🍾', '💥'];

shotBtn.addEventListener('click', (e) => {
    shots++;
    shotCountEl.textContent = shots;

    // Faz a tela tremer como batida de som automotivo
    document.body.classList.remove('bass-shake');
    void document.body.offsetWidth; // Reinicia a animação
    document.body.classList.add('bass-shake');

    // Cria elementos flutuantes na tela
    for (let i = 0; i < 5; i++) {
        const span = document.createElement('span');
        span.classList.add('floating-shot');
        span.textContent = icons[Math.floor(Math.random() * icons.length)];

        const randomX = (Math.random() - 0.5) * 180;
        const startX = e.clientX ? e.clientX + randomX : window.innerWidth / 2 + randomX;
        const startY = e.clientY ? e.clientY : window.innerHeight / 2;

        span.style.left = `${startX}px`;
        span.style.top = `${startY}px`;

        particlesContainer.appendChild(span);

        setTimeout(() => {
            span.remove();
        }, 1400);
    }
});
