import { ListaItem } from './../../models/lista-item.model';
import { Lista } from './../../models/lista.model';
import { DeseosService } from './../../services/deseos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  //OJO: esta lista no es una lista nueva, es la lista creada en tab1.page.ts, por tanto cualquier modificación afectará a la lista (pasada por referencia).
  lista: Lista;
  nombreItem = "";

  constructor(private _deseosService: DeseosService,
              private _activatedRoute: ActivatedRoute) {

    //Este metodo del activatedRoute sirve para leer un parametro especifico de una ruta, en este caso el 'idLista' definido en tab1-routing.module.ts
    const idLista = _activatedRoute.snapshot.paramMap.get('idLista');
    this.lista = _deseosService.obtenerLista(idLista);
  }

  ngOnInit() {
  }

  agregarItem() {
    //Si no pongo la comprobación fuerte (===) el length siempre será = 0 y no crearía la lista.
    if (this.nombreItem.length === 0) {
      return; 
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    //La siguiente linea que borra el nombre del item, se usa para que cuando se cree el item, so borre y se pueda escribir inmediatamente otro item para la lista.
    this.nombreItem = "";

    this._deseosService.guardarStorage();
  }

  cambioCheck( elemento: ListaItem ){
    //con la función filter busco los items dentro de la lista que tengan el completado a false.
    const pendientes = this.lista.items.filter( itemData => !itemData.completado).length;

    //forma mas elegante de ver en consola.
    // console.log({ pendientes });

    if (pendientes === 0) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this._deseosService.guardarStorage();

    console.log(this._deseosService.listas);
  }

  borrar(item){
    this.lista.items.splice(item, 1);
    this._deseosService.guardarStorage();
  }

}
