import { AutorCard } from "js/clases/AutorCard.js";

const autoresIDs = [
  'OL23919A',        // J.K. Rowling
  'OL2162285A',      // Stephen King
  'OL8223633A',      // Mariana Enríquez
  'OL1394350A'       // Brandon Sanderson 
];

async function cargarAutores() {
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
            : 'https://via.placeholder.com/150';

        const nombre = data.name || 'Autor Desconocido';
        
        return {
            id,
            nombre,
            foto
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default cargarAutores;