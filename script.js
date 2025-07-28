// Efectos y juego interactivo
const entrarBtn = document.getElementById('entrarBtn');
const entrada = document.getElementById('entrada');
const juego = document.getElementById('juego');
const ideasDiv = document.getElementById('ideas');
const motivacion = document.getElementById('motivacion');
const fraseMotivacional = document.getElementById('fraseMotivacional');
const siguienteBtn = document.getElementById('siguienteBtn');
const preguntaFinal = document.getElementById('preguntaFinal');

const mensajesMotivacionales = [
    "Ten un buen inicio de semana :D",
    "y brilla como vestido de teibolera xD",
    "Recuerda: cruza la calle mirando a ambos lados… y toma agüita",
    "Y comerás bien saludable. Y si no tienes para comer, me mandas un mensaje… ahí tengo $1 mal parqueado en la cuenta, para ti :D"
];

const mensajesIntento = [
    "¡Uy! No fue a la primera, pero aún puedes ganar el reto o los 2 dólares...",
    "¡Casi! Si le atinas ahora, me debes el reto final jaja, presiona el ultimo foco jaja",
    "¡Ahora sí, este es el intento decisivo!"
];

let indiceMotivacion = 0;
let intentosFoco = 0;

entrarBtn.addEventListener('click', () => {
    entrada.classList.add('oculto');
    juego.classList.remove('oculto');
    iniciarJuego();
});

function iniciarJuego() {
    ideasDiv.innerHTML = '';
    motivacion.classList.add('oculto');
    preguntaFinal.classList.add('oculto');
    document.getElementById('mensajeIntento').textContent = '';
    indiceMotivacion = 0;
    intentosFoco = 0;
    const total = 5;
    for (let i = 0; i < total; i++) {
        const idea = document.createElement('span');
        idea.classList.add('idea');
        idea.innerHTML = '💡';
        idea.addEventListener('click', function handler() {
            if (idea.classList.contains('ganador') || idea.style.opacity === '0.3') return;
            intentosFoco++;
            if (intentosFoco === 3) {
                idea.classList.add('ganador');
                document.getElementById('mensajeIntento').textContent = '';
                mostrarMotivacion();
                animarConfeti();
                // Deshabilitar los demás focos
                Array.from(ideasDiv.children).forEach(f => {
                    f.style.pointerEvents = 'none';
                });
            } else {
                idea.style.opacity = '0.3';
                idea.style.transform = 'scale(0.7) rotate(-10deg)';
                idea.style.pointerEvents = 'none';
                document.getElementById('mensajeIntento').textContent = mensajesIntento[intentosFoco-1] || '';
            }
        });
        ideasDiv.appendChild(idea);
    }
}

function mostrarMotivacion() {
    fraseMotivacional.textContent = mensajesMotivacionales[indiceMotivacion];
    motivacion.classList.remove('oculto');
    siguienteBtn.classList.remove('oculto');
}

siguienteBtn.addEventListener('click', () => {
    indiceMotivacion++;
    if (indiceMotivacion < mensajesMotivacionales.length) {
        fraseMotivacional.textContent = mensajesMotivacionales[indiceMotivacion];
    } else {
        motivacion.classList.add('oculto');
        preguntaFinal.classList.remove('oculto');
    }
});

// Efecto confeti
function animarConfeti() {
    for (let i = 0; i < 40; i++) {
        const confeti = document.createElement('div');
        confeti.className = 'confeti';
        confeti.style.position = 'fixed';
        confeti.style.left = Math.random() * 100 + 'vw';
        confeti.style.top = '-30px';
        confeti.style.width = '12px';
        confeti.style.height = '12px';
        confeti.style.background = `hsl(${Math.random()*360}, 80%, 70%)`;
        confeti.style.borderRadius = '50%';
        confeti.style.opacity = 0.8;
        confeti.style.zIndex = 9999;
        confeti.style.transition = 'top 2.5s cubic-bezier(.23,1.01,.32,1)';
        document.body.appendChild(confeti);
        setTimeout(() => {
            confeti.style.top = (window.innerHeight + 30) + 'px';
        }, 10);
        setTimeout(() => {
            confeti.remove();
        }, 2600);
    }
}
