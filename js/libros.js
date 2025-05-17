class Paginator(datos, cant) {
    constructor(){
        this.datos = datos;
        this.cant = cant;
        this.total = datos.length()/cant;
        this.pag_actual = 0
    }
}
