import { Lista } from './../models/lista.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];

  constructor() {
    //Datos de prueba para probar
    // const lista1 = new Lista("Recolectar piedras del infinito");
    // const lista2 = new Lista("Motos a comprar");

    // this.listas.push(lista1, lista2);
    // console.log("LISTAS push: %O",this.listas);

    this.cargarStorage();

  }

  crearLista(titulo){
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
     console.log("[deseos.service] NUEVA LISTA: ", nuevaLista);
    return nuevaLista.id;
  }

  obtenerLista(id: string | number){
    // Hace un Casting para forzar a que sea numero, ya que el id lo hemos generado como numeros.
    id = Number(id);
    return this.listas.find( listaData => listaData.id == id );
  }

  guardarStorage(){
    localStorage.setItem( 'data', JSON.stringify(this.listas) );
  }

  cargarStorage(){
    //Creo esta validacion porque si estuviese vacio, el JSON.parse daría un error.
    if( localStorage.getItem('data') ){
      this.listas = JSON.parse( localStorage.getItem('data') );
    }
  }

  borrarLista(lista: Lista){
    this.listas = this.listas.filter( listaData =>{
      return listaData.id !== lista.id;
    });
    
    this.guardarStorage();
  }

  // METODO QUE YO HICE PERO QUE NO SE LLAMA DE MOMENTO, PORQUE EL PROFE HIZO LA ACTUALIZACION DEL NOMBRE SIN NECESIDAD DE LLEGAR HASTA AQUI.
  cambiarNombreLista(idLista: number, nombreNuevoLista: string){
    // console.log("[deseos.service => cambiarNombreLista], llegué aqui HP!");
    this.listas.filter( lista =>{
      if(lista.id === idLista){
        return lista.titulo = nombreNuevoLista;
      }
    });
    this.guardarStorage();
  }

}
