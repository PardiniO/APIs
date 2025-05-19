export function moverCarrusel() {
    const wrappers = document.querySelectorAll('.carrusel-wrapper');

    wrappers.forEach(wrapper => {
        const carrusel = wrapper.querySelector('.carrusel');
        const btnIzq = wrapper.querySelector('.btn-izq');
        const btnDer = wrapper.querySelector('.btn-der');

        const actualizarVisibilidad = () => {
            btnIzq.classList.toggle('hidden', carrusel.scrollLeft === 0);
            const scrollMax = carrusel.scrollWidth - carrusel.clientWidth - 1;
            btnDer.classList.toggle('hidden', carrusel.scrollLeft >= scrollMax);
        };
        actualizarVisibilidad();

        [btnIzq, btnDer].forEach(boton => {
            boton.addEventListener('click', () => {
                const direccion = boton.classList.contains('btn-izq') ? -1 : 1;
                const ancho = carrusel.querySelector('.item-carrusel')?.offsetWidth || 200;
                carrusel.scrollBy({ left: direccion * (ancho + 20), behavior: 'smooth' });
                setTimeout(actualizarVisibilidad, 400);
            });
        });

        carrusel.addEventListener('scroll', actualizarVisibilidad);
    });
}
