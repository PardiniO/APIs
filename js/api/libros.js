export async function buscarLibros(query) {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        const contenedor = document.getElementById('resultados-libros');
        if (!contenedor) return;
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
        const contenedor = document.getElementById('resultados-libros');
        if (contenedor) contenedor.innerHTML = '<p>Error al cargar los resultados. Intenta de nuevo más tarde.</p>';
    }
}

export async function buscarConFiltros(query, pagina = 1) {
    const filtrosOrden = document.getElementById('ordenar')?.value || '';
    const resultadosPorPagina = 10;
    const startIndex = (pagina - 1) * resultadosPorPagina;

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&orderBy=${filtrosOrden}&startIndex=${startIndex}&maxResults=${resultadosPorPagina}`);
        const data = await response.json();

        const contenedor = document.getElementById('resultados-libros');
        const contador = document.getElementById('contador-resultados');
        if (!contenedor || !contador) return;
        contenedor.innerHTML = '';
        contador.innerHTML = '';

        if (!data.items || data.items.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron resultados</p>';
            return;
        }

        contador.textContent = `Resultados encontrados: ${data.totalItems}`;

        if (filtrosOrden === 'alfabetico') {
            data.items.sort((a, b) => {
                const tituloA = a.volumeInfo.title || '';
                const tituloB = b.volumeInfo.title || '';
                return tituloA.localeCompare(tituloB);
            });
        }

        data.items.forEach(libro => {
            const info = libro.volumeInfo;
            const titulo = info.title || 'Sin título';
            const autor = info.authors?.join(', ') || 'Autor desconocido'; 
            const imagen = info.imageLinks?.thumbnail || 'https://via.placeholder.com/128x193?text=Sin+imagen';

            const div = document.createElement('div');
            div.className = 'resultado-libro';
            div.innerHTML = `
                <img src="${imagen}" alt="${titulo}">
                <div>
                    <h3>${titulo}</h3>
                    <p>${autor}</p>
                    <p><strong>Año:</strong> ${info.publishedDate || 'N/D'}</p>
                    <p><strong>ISBN:</strong> ${info.industryIdentifiers?.[0]?.identifier || 'No disponible'}</p>
                </div>
            `;
            contenedor.appendChild(div);
        });

        generarPaginacion(data.totalItems, resultadosPorPagina, pagina, query);

    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('resultados-libros');
        if (contenedor) contenedor.innerHTML = '<p>Error al cargar los resultados. Intenta de nuevo más tarde.</p>';
    }
}

function generarPaginacion(total, porPagina, actual, query) {
    const paginas = Math.ceil(total / porPagina);
    const paginacion = document.getElementById('paginacion');
    paginacion.innerHTML = '';

    for (let i = 1; i <= Math.min(paginas, 10); i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === actual) btn.classList.add('active');
        btn.addEventListener('click', () => {
            buscarConFiltros(query, i);
        });
        paginacion.appendChild(btn);
    }
}

export async function cargarLibrosTop() {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=best%20books`);
        const data = await response.json();
        const carrusel = document.getElementById('carrusel-destacado');
        if (!carrusel) return;
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
        const carrusel = document.getElementById('carrusel-destacado');
        if (carrusel) carrusel.innerHTML = '<p>Error al cargar los libros destacados. Intenta de nuevo más tarde.</p>';
    }
}

export async function cargarLibrosPublicos() {
    try {
        const response = await fetch('https://gutendex.com/books/?languages=es');
        const data = await response.json();
        const carrusel = document.getElementById('carrusel-gutendex');
        if (!carrusel) return;
        carrusel.innerHTML = '';
        
        data.results.slice(0, 10).forEach(libro => {
            const titulo = libro.title;
            const autor = libro.authors?.[0]?.name || 'Anónimo';
            const imagen = libro.formats?.['image/jpeg'] || 'https://via.placeholder.com/128x193?text=Sin+imagen';
            const enlace = libro.formats?.['text/html'] || libro.formats?.['application/pdf'] || libro.formats?.['application/epub+zip']|| '#';
            
            const item = document.createElement('div');
            item.className = 'item-carrusel';
            item.innerHTML = `
                <img src="${imagen}" alt="${titulo}">
                <h3>${titulo}</h3>
                <p>${autor}</p>
                <a href="${enlace}" target="_blank" style="color: #fff;">Leer</a>
            `;
            carrusel.appendChild(item);
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('carrusel-gutendex');
        if (contenedor) contenedor.innerHTML = '<p>Error al cargar los libros públicos. Intenta de nuevo más tarde.</p>';
    }
}
