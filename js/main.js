import { buscarLibros, buscarConFiltros, generarPaginacion, cargarLibrosTop, cargarLibrosPublicos } from "./api/libros.js";
import { moverCarrusel } from "./ui/carrusel.js";
import { cargarAutores } from "./api/autores.js";
import { detalleAutor } from "./ui/detalleAutor.js";

document.addEventListener('DOMContentLoaded', () => {
    try {
        buscarLibros();
        generarPaginacion();
        cargarLibrosTop();
        cargarLibrosPublicos();
        moverCarrusel();
        cargarAutores();
        detalleAutor();
    } catch (error) {
        console.error('Error al cargar la página:', error);
        msjError('Error al cargar la página. Por favor, inténtelo de nuevo más tarde.');
    }

    function manejarBusqueda() {
        const input = document.getElementById('busqueda');
        if (input && input.value.trim()) {
            console.log('Buscando:', input.value.trim());
            buscarConFiltros(input.value.trim());
        }
    }
    const inputBusqueda = document.getElementById('busqueda');
    const iconoBusqueda = document.getElementById('icono-busqueda');
    
    if (iconoBusqueda) {
        iconoBusqueda.setAttribute('role', 'button');
        iconoBusqueda.setAttribute('aria-label', 'Buscar');
        iconoBusqueda.addEventListener('click', manejarBusqueda);
    }
    
    if (inputBusqueda) {
        inputBusqueda.setAttribute('aria-label', 'Campo de búsqueda');
    
        inputBusqueda.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (!e.target.value.trim()) return;
                buscarConFiltros(e.target.value.trim());
            }
        });

        let debounceTimeout;
        inputBusqueda.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(manejarBusqueda, 300);
        })
    }

    const btnCerrarBusqueda = document.getElementById('cerrar-busqueda'); 
    if (btnCerrarBusqueda) {
        btnCerrarBusqueda.addEventListener('click', () => {
            const seccionResultados = document.querySelector('.busqueda-contenedor');
            if (seccionResultados) seccionResultados.style.display = 'none';

            document.querySelectorAll('main > section:not(.busqueda-contenedor)').forEach((sec) => {
                sec.style.display = 'block';
            });

            const contenedor = document.getElementById('resultados-libros');
            const contador = document.getElementById('cantidad-resultados');
            if (contenedor) contenedor.innerHTML = '';
            if (contador) contador.innerHTML = '';
        });
    }

    const filtrosOpciones = document.getElementById('filtros-checkbox');
    if (filtrosOpciones) {
        const btnFiltros = document.getElementById('icono-filtros') || filtrosOpciones.previousElementSibling;
        if (btnFiltros) {
            btnFiltros.setAttribute('role', 'button');
            btnFiltros.setAttribute('aria-label', 'Mostrar filtros');
            btnFiltros.addEventListener('click', () => {
                filtrosOpciones.style.display = (filtrosOpciones.style.display === 'none' || filtrosOpciones.style.display === '') ? 'block' : 'none';
            });
        }
    }

    const menuOpciones = document.getElementById('menu');
    if (menuOpciones) {
        menuOpciones.setAttribute('role', 'button');
        menuOpciones.setAttribute('aria-label', 'Abrir menú');
        menuOpciones.addEventListener('click', ()=> {
            const nav = document.getElementById('menu-nav');
            if (nav) {
                const abierto = nav.style.display === 'inline';
                nav.style.display = abierto ? 'none' : 'inline';
                menuOpciones.setAttribute('aria-expanded', !abierto);
            }
        });
    }

    function msjError(mensaje) {
        const contenedor = document.getElementById('resultados-libros');
        if (contenedor) {
            contenedor.innerHTML = `<p style="color: red; font-weight: bold;">${mensaje}</p>`;
        }
        
    }
});
