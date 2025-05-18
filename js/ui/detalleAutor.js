export async function detalleAutor() {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    if (!id) return;
    
    try {
        const autorResponse = await fetch(`https://openlibrary.org/authors/${id}.json`);
        const autorData = await autorResponse.json();
        
        document.getElementById('nombre-autor').textContent = autorData.name;
        
        const fotoAutor = document.getElementById('foto-autor');
        if (autorData.photos && autorData.photos.length > 0) {
            fotoAutor.src = `https://covers.openlibrary.org/a/id/${autorData.photos[0]}-L.jpg`;
        } else {
            fotoAutor.src = 'https://via.placeholder.com/150';
        }

        const bio = autorData.bio
            ? (typeof autorData.bio === 'object' ? autorData.bio.value : autorData.bio)
            : 'No hay biografía disponible.';
        document.getElementById('bio-autor').textContent = bio;

        const obrasResponse = await fetch(`https://openlibrary.org/authors/${id}/works.json`);
        const obrasData = await obrasResponse.json();
        
        const listaObras = document.getElementById('lista-obras');
        if (listaObras && obrasData.entries) {
            listaObras.innerHTML = ''; // Limpiar la lista antes de agregar nuevas obras
            obrasData.entries.slice(0, 10).forEach(obra => {
                const li = document.createElement('li');
                li.textContent = obra.title;
                listaObras.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error fetching author details:', error);
    }
}