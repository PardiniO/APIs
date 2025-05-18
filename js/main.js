import { detalleAutor } from "js/ui/detalleAutor.js";

document.addEventListener('DOMContentLoaded', () => {
    cargarLibrosTop();
    cargarLibrosPublicos();
    moverCarrusel();
    cargarAutores();
    detalleAutor();

    document.getElementById('icono-busqueda')?.addEventListener('click', () => {
        const valor = document.getElementById('busqueda').value.trim();
        if (valor) {
            buscarLibros(valor);
        } else {
            alert('Por favor, ingresa un término de búsqueda.');
        }
    });

    document.getElementById('icono-filtros').addEventListener('click', () => {
        const filtrosOpciones = document.getElementById('filtros-checkbox');
        if (filtrosOpciones.style.display === 'none' || filtrosOpciones.style.display === '') {
            filtrosOpciones.style.display = 'block';
        } else {
            filtrosOpciones.style.display = 'none';
        }
    })

    document.getElementById('icono-menu').addEventListener('click', ()=> {
        const menuOpciones = document.getElementById('menu-nav');
        if (menuOpciones.style.display === 'none' || menuOpciones.style.display === '') {
            menuOpciones.style.display = 'inline';
        } else {
            menuOpciones.style.display = 'none';
        }
    } )
});
