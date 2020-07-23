import { AlertController, IonList } from '@ionic/angular';
import { Lista } from './../../models/lista.model';
import { DeseosService } from './../../services/deseos.service';
import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  listas: Lista;
  
  // Variable que se espera que se envíe desde un componente padre hacia el hijo @Input.
  // Para enviar datos en variables desde un hijo a un padre se usa el @Output
  @Input() terminada = true;

  //Con esta importación podemos coger un elemento entero de html.
  @ViewChild( IonList ) elementoLista: IonList;

  constructor(public _deseosService: DeseosService,
              private router: Router, 
              private alertCtrl: AlertController) {
  }




  listaSeleccionada(lista: Lista){
    //Puedo viajar a esta url porque he agregado el path correspondiente en tab1-routing.module.ts y tab2-routing.module.ts
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${ lista.id }`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }

    console.log("Entro en lista seleccionada: ", lista);
  }

  borraLista(lista: Lista){
    this._deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista) {
    
    console.log("lista editarLIsta: ", lista);
    const alert = await this.alertCtrl.create({
      header: 'Modificar Nombre',
      inputs: [
        {
          name: 'nombreNuevoLista',
          type: 'text',
          id: 'nombreNuevoLista',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Actualizar',
          handler: (data) => {
            //YO LO HABIA HECHO DE ESTA FORMA.
            // console.log('Cambiando el nombre anterior ('+lista.titulo+') por el nuevo: ',data.nombreNuevoLista);
            // this._deseosService.cambiarNombreLista(lista.id, data.nombreNuevoLista);

            // EL PROFE LO HIZO DE ESTA FORMA:
            lista.titulo = data.nombreNuevoLista
            this._deseosService.guardarStorage();
            
            // Elemento de la lista que se movió izquierda o dcha para actualizar nombre y que queremos que vuelva a su sitio automaticamente (unslide).
            this.elementoLista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }

}
