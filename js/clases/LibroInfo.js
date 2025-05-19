export class LibroInfo {
    constructor({ imagen, titulo, autor, rating, sinopsis, enlace, esGutendex, infoExtra }) {
        this.imagen = imagen;
        this.titulo = titulo;
        this.autor = autor;
        this.rating = rating;
        this.sinopsis = sinopsis;
        this.enlace = enlace;
        this.esGutendex = esGutendex || false;
        this.infoExtra = infoExtra || {};
    }

    static fromGoogleBooks(libro) {
        const info = libro.volumeInfo || {};
        return new LibroInfo({
            imagen: info.imageLinks?.thumbnail || 'data:image/svg+xml;base64,...',
            titulo: info.title || 'Sin título',
            autor: info.authors?.join(', ') || 'Autor desconocido',
            rating: info.averageRating ?? 'N/A',
            sinopsis: info.description ?? 'Sin sinopsis disponible',
            enlace: '', // Google Books no tiene enlace directo para leer
            esGutendex: false,
            infoExtra: {
                anio: info.publishedDate || 'N/D',
                isbn: info.industryIdentifiers?.[0]?.identifier || 'No disponible',
                genero: info.categories?.join(', ') || 'N/D',
                paginas: info.pageCount || 'N/D',
                formato: info.printType || 'N/D',
                idioma: info.language || 'N/D'
            }
        });
    }

    static fromGutendex(libro) {
        return new LibroInfo({
            imagen: libro.formats?.['image/jpeg'] || 'data:image/svg+xml;base64,...',
            titulo: libro.title || 'Sin título',
            autor: libro.authors?.[0]?.name || 'Anónimo',
            rating: libro.rating ?? 'N/A',
            sinopsis: libro.subjects?.join(', ') ?? 'Sin sinopsis disponible',
            enlace: libro.formats?.['text/html'] || libro.formats?.['application/pdf'] || libro.formats?.['application/epub+zip'] || '#',
            esGutendex: true,
            infoExtra: {
                anio: libro.copyright_year || 'N/D',
                isbn: 'No disponible',
                genero: libro.subjects?.slice(0, 2).join(', ') || 'N/D',
                paginas: libro.pagination || 'N/D',
                formato: libro.formats ? Object.keys(libro.formats).join(', ') : 'N/D',
                idioma: libro.languages?.[0] || 'N/D'
            }
        });
    }
}