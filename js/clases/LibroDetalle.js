export class LibroDetalle {
    constructor(datos) {
        this.datos = datos;
    }
    mostrar() {
        document.querySelector('main > section').forEach((sec) => sec.style.display = 'none');
        const detalle = document.querySelector('.detalle-libro');
        if (!detalle) return;
        detalle.style.display = 'block';

        document.getElementById('portada-libro').src = this.datos.imagen || '';
        document.getElementById('titulo-libro').textContent = this.datos.titulo || 'Sin título';
        document.getElementById('autor-libro').textContent = this.datos.autor || 'Autor desconocido';
        document.getElementById('rating-libro').textContent = this.datos.rating ?? 'N/A';
        document.getElementById('genero-libro').textContent = this.datos.genero || 'N/D';
        document.getElementById('paginas-libro').textContent = this.datos.paginas || 'N/D';
        document.getElementById('sinopsis-libro').textContent = this.datos.sinopsis || 'Sin sinopsis disponible';
        document.getElementById('formato-libro').textContent = this.datos.formato || 'N/D';
        document.getElementById('fecha-publicacion').textContent = this.datos.fechaPublicacion || 'N/D';
        document.getElementById('isbn-libro').textContent = this.datos.isbn || 'No disponible';
        document.getElementById('idioma-libro').textContent = this.datos.idioma || 'N/D';

        document.getElementById('btn-mas-info').onclick = () => {
            const masInfo = document.getElementById('mas-info-libro');
            masInfo.style.display = masInfo.style.display === 'none' ? 'block' : 'none';
        };
    }
}