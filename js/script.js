// HEADER STICKY
const header = document.getElementById('header');
const arriba = document.getElementById('arriba');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
        arriba.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        arriba.classList.remove('visible');
    }
});

// MENÚ HAMBURGUESA
const menuToggle = document.getElementById('menuToggle');
const navegacion = document.getElementById('navegacion');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('activo');
    navegacion.classList.toggle('activo');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.navegacion a').forEach(enlace => {
    enlace.addEventListener('click', () => {
        menuToggle.classList.remove('activo');
        navegacion.classList.remove('activo');
    });
});

// ANIMACIONES AL SCROLL
const elementosAnimar = document.querySelectorAll('[data-animar]');

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visible');
            observador.unobserve(entrada.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

elementosAnimar.forEach(el => observador.observe(el));

// CONTADORES ANIMADOS
const contadores = document.querySelectorAll('.estadistica__numero');

const animarContador = (elemento) => {
    const objetivo = parseInt(elemento.dataset.conteo);
    const duracion = 2000;
    const incremento = objetivo / (duracion / 16);
    let actual = 0;

    const actualizar = () => {
        actual += incremento;
        if (actual < objetivo) {
            elemento.textContent = Math.floor(actual);
            requestAnimationFrame(actualizar);
        } else {
            elemento.textContent = objetivo;
        }
    };
    actualizar();
};

const observadorContador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            animarContador(entrada.target);
            observadorContador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.5 });

contadores.forEach(c => observadorContador.observe(c));
