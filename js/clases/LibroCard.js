export class LibroCard {
    constructor(libro, onDetalle) {
        this.libro = libro;
        this.onDetalle = onDetalle;
    }

    render() {
        const item = document.createElement('div');
        item.className = 'item-carrusel';
        item.innerHTML = `
            <img src="${this.libro.imagen}" alt="${this.libro.titulo}">
            <h3>${this.libro.titulo}</h3>
            <p>${this.libro.autor}</p>
            <button class="btn-agregar-biblio">Agregar</button>
            ${this.libro.esGutendex && this.libro.enlace ? `<a class="btn-leer-libro" href="${this.libro.enlace}" target="_blank">Leer</a>` : ''}
            <div class="info-hover">
                <p><strong>Rating:</strong> ${this.libro.rating}</p>
                <p>${this.libro.sinopsis.slice(0, 120)}...</p>
            </div>
        `;
        item.addEventListener('click', (e) => {
            if (
                e.target.classList.contains('btn-agregar-biblio') ||
                e.target.classList.contains('btn-leer-libro')
            ) return;
            this.onDetalle(this.libro);
        });
        return item;
    }
}