import { ListaItem } from './lista-item.model';

export class Lista{

    id: number; 
    titulo: string;
    creadaEn: Date;
    completada: boolean;
    terminadaEn: Date;
    items: ListaItem[];

    constructor(titulo: string){
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.completada = false;
        this.items = [];

        this.id = new Date().getTime();
    }
}