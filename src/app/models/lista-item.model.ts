
// usamos la palabra export para que pueda ser usada fuera de aqui
export class ListaItem{
    
    desc: string;
    completado: boolean;

    constructor(descripcion: string){
        this.desc = descripcion;
        this.completado = false;
    }
}