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
            const info = libro.volumeInfo || {};
            const titulo = info.title || 'Sin título';
            const autor = info.authors?.[0] || 'Autor desconocido';
            const imagen = info.imageLinks?.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==';

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
    const resultadosPorPagina = 10;
    const startIndex = (pagina - 1) * resultadosPorPagina;
    
    const seccionResultados = document.querySelector('.busqueda-contenedor');
    if (seccionResultados) seccionResultados.style.display = 'block';
    document.querySelectorAll('main > section:not(.busqueda-contenedor)').forEach(sec => {
        sec.style.display = 'none';
    })
    
    if (!query || !query.trim()) return;    

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${resultadosPorPagina}`);
        const data = await response.json();
        console.log(data);

        const contenedor = document.getElementById('resultados-libros');
        const contador = document.getElementById('cantidad-resultados');
        if (!contenedor || !contador) return;
        contenedor.innerHTML = '';
        contador.innerHTML = '';

        if (!data.items || data.items.length === 0) {
            contenedor.innerHTML = '<p>No se encontraron resultados</p>';
            return;
        }

        contador.textContent = `Resultados encontrados: ${data.totalItems}`;

        data.items.forEach(libro => {
            const info = libro.volumeInfo;
            const titulo = info.title || 'Sin título';
            const autor = info.authors?.join(', ') || 'Autor desconocido'; 
            const imagen = info.imageLinks?.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==';

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

        paginacion(data.totalItems, resultadosPorPagina, pagina, query);
        if (!data.totalItems) {
            contenedor.innerHTML = '<p>No se encontraron resultados</p>';
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('resultados-libros');
        if (contenedor) contenedor.innerHTML = '<p>Error al cargar los resultados. Intenta de nuevo más tarde.</p>';
    }
}

export function paginacion(data, pagina,cantidadP, query) {
    const indice = (pagina - 1) * cantidadP;
    const total = data.slice(indice, indice + cantidadP);
    const paginacion = document.getElementById('paginacion');
    paginacion.innerHTML = '';
    
    const pagNext = pagina + 1;
    const pagPrev = pagina - 1;
    const resultado = {
        "next": pagNext,
        "prev": pagPrev,
        "page": pagina,
        "total": total,
    }
    
    if (pagPrev) {
        const btnPrev = document.createElement('button');
        btnPrev.textContent = 'Anterior';
        btnPrev.addEventListener('click', () => buscarConFiltros(query, pagPrev));
        paginacion.appendChild(btnPrev);
    }
    
    if (pagNext) {
        const btnNext = document.createElement('button');
        btnNext.textContent = 'Siguiente';
        btnNext.addEventListener('click', () => buscarConFiltros(query, pagNext));
        paginacion.appendChild(btnNext);
    }
    
    return resultado;
}

export async function cargarLibrosTop() {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=best%20books`);
        const data = await response.json();
        const carrusel = document.getElementById('carrusel-destacado');
        if (!carrusel) return;
        carrusel.innerHTML = '';
        
        data.items.slice(0, 10).forEach(libroRow => {
            const libro = LibroInfo.fromGoogleBooks(libroRow);
            const card = new LibroCard(libro, (libro) => LibroDetalle.mostrar(libro));
            carrusel.appendChild(card.render()); 
        });
        console.log(data.items); //¿Hay datos?
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
        
        data.results.slice(0, 10).forEach(libroRaw => {
            const libro = LibroNormalizado.fromGutendex(libroRaw);
            const card = new LibroCard(libro, (libro) => LibroDetalle.mostrar(libro));
            carrusel.appendChild(card.render());
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('carrusel-gutendex');
        if (contenedor) contenedor.innerHTML = '<p>Error al cargar los libros públicos. Intenta de nuevo más tarde.</p>';
    }
}