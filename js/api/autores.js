import { AutorCard } from "../clases/AutorCard.js";

const autoresIDs = [
  'OL23919A',        // J.K. Rowling
  'OL2162285A',      // Stephen King
  'OL8223633A',      // Mariana Enríquez
  'OL1394350A'       // Brandon Sanderson 
];

export async function cargarAutores() {
    const contenedor = document.getElementById('autores');
    if (!contenedor) return;

    for (const id of autoresIDs) {
        const autor = await fetchAutor(id);
        if (autor) {
            const card = new AutorCard(
                autor.foto,
                autor.nombre,
                'Ver más',
                'Agregar'
            );

            const btnVerMas = card.element.querySelector('.btn-ver-mas');
            if (btnVerMas) {
                btnVerMas.addEventListener('click', () => {
                    document.location.href = `autor.html?id=${id}`;
                });
            }

            contenedor.appendChild(card.element);
        }
    }
}

async function fetchAutor(id) {
    try {
        const response = await fetch(`https://openlibrary.org/authors/${id}.json`);
        const data = await response.json();

        const foto = data.photos && data.photos.length > 0
            ? `https://covers.openlibrary.org/a/id/${data.photos[0]}-M.jpg`
            : 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==';

        const nombre = data.name || 'Autor Desconocido';
        
        return {
            id,
            nombre,
            foto
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            id,
            nombre: 'Autor Desconocido',
            foto: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg=='
        };
    }
}