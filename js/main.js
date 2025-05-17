class AutorCard {
    constructor(img, nombre, generos, btnVer, btnAgregar) {
        this.card = document.createElement('div');
        this.card.className = 'autor';
        this.img = img;
        
        this.card.appendChild(cardImage);
        this.card.appendChild(cardNombre);
        this.card.appendChild(cardGeneros);
        this.card.appendChild(cardBtnVer);
        this.card.appendChild(cardBtnAgregar);

        const cardImage = document.createElement('img');
        cardImage.className = 'foto-autor';
        

        const cardNombre = document.createElement('h2');
        cardNombre.className = 'nombre-autor';
        cardNombre.textContent = nombre

        const cardGeneros = document.createElement('p');
        cardGeneros.className = 'generos-autor';
        cardGeneros.textContent = generos;

        const cardBtnVer = document.createElement('button');
        cardBtnVer.className = 'btn-ver-mas';
        cardBtnVer.textContent = btnVer;

        const cardBtnAgregar = document.createElement('button');
        cardBtnAgregar.className = 'btn-agregar';
        cardBtnAgregar.textContent = btnAgregar;
    }
}

async function cargarLibrosTop() {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=best%20books`);
        const data = await response.json();
        const carrusel = document.getElementById('carrusel-destacado');
        carrusel.innerHTML = '';
        
        data.items.slice(0, 10).forEach(libro => {
            const info = libro.volumeInfo;
            const titulo = info.title || 'Sin título';
            const autor = info.authors?.join(', ') || 'Autor desconocido';
            const imagen = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193?text=Sin+imagen';
            
            const item = document.createElement('div');
            item.className = 'item-carrusel';
            item.innerHTML = `
                <img src="${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>${autor}</p>
            `;
            carrusel.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '<p>Error al cargar los libros. Intenta de nuevo más tarde.</p>';
    }
}

async function cargarLibrosPublicos() {
    try {
        const response = await fetch('https://gutendex.com/books/?languages=es');
        const data = await response.json();
        const carrusel = document.getElementById('carrusel-gutendex');
        carrusel.innerHTML = '';
        
        data.results.slice(0, 10).forEach(libro => {
            const titulo = libro.title;
            const autor = libro.authors && libro.authors?.[0]?.name || 'Anonimo';
            const imagen = libro.formats && libro.formats?.['image/jpeg'] || 'https://via.placeholder.com/128x193?text=Sin+imagen';
            const enlace = libro.formats && libro.formats?.['text/html'] || libro.formats['application/pdf'] || libro.formats['application/epub+zip']|| '#';
            
            const item = document.createElement('div');
            item.className = 'item-carrusel';
            item.innerHTML = `
                <img src="${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>${autor}</p>
                <a href="${enlace}" target="_blank" style="color: #fff;">Leer</a>
            `;
            carrusel.appendChild(item);
        })

    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('dom-publico');
        contenedor.innerHTML = '<p>Error al cargar los libros públicos. Intenta de nuevo más tarde.</p>';
    }
}

async function buscarLibros(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        const contenedor = document.getElementById('resultados-libros');
        contenedor.innerHTML = '';

        if (!data.items || data.items.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron resultados</p>'
            return;
        }

        data.items?.forEach(libro => {
            const info = libro.volumeInfo;
            const titulo = info.title || 'Sin título';
            const autor = info.authors?.[0] || 'Autor desconocido';
            const imagen = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193?text=Sin+imagen';

            const item = document.createElement('div');
            item.className = 'item-carrusel';
            item.innerHTML = `
                <img src="${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>${autor}</p>
            `;
            contenedor.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '<p>Error al cargar los resultados. Intenta de nuevo más tarde.</p>';
    }
}

function moverCarrusel(id, direccion) {
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
                const direccion = classList.contains('izq') ? -1 : 1;
                const ancho = carrusel.querySelector('item-carrusel')?.offsetWidth || 200;
                carrusel.scrollBy({ left: direccion * (ancho + 20), behavior: 'smooth' });

                setTimeout(actualizarVisibilidad, 400);
            });
        });
        carrusel.addEventListener('scroll', actualizarVisibilidad);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarLibrosTop();
    cargarLibrosPublicos();
    moverCarrusel();

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
