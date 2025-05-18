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
