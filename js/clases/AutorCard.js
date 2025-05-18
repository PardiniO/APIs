class AutorCard {
    constructor(img, nombre, btnVerMas, btnAgregar) {
        this.card = document.createElement('div');
        this.card.className = 'autor';
        
        const cardImage = document.createElement('img');
        cardImage.className = 'foto-autor';
        cardImage.src = img;
        
        const cardNombre = document.createElement('h2');
        cardNombre.className = 'nombre-autor';
        cardNombre.textContent = nombre
        
        const cardBtnVer = document.createElement('a');
        cardBtnVer.className = 'btn-ver-mas';
        cardBtnVer.href = '#';
        cardBtnVer.textContent = btnVerMas;
        
        const cardBtnAgregar = document.createElement('a');
        cardBtnAgregar.className = 'btn-agregar';
        cardBtnAgregar.href = '#';
        cardBtnAgregar.textContent = btnAgregar;
        
        this.card.appendChild(cardImage);
        this.card.appendChild(cardNombre);
        this.card.appendChild(cardBtnVer);
        this.card.appendChild(cardBtnAgregar);
    }
    
    appendTo(parent) {
        if (parent instanceof HTMLElement) {
            parent.appendChild(this.card);
        } else {
            console.error('El elemento padre no es un HTMLElement');
        }
    }
}
