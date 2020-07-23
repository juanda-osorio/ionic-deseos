import { DeseosService } from './../../services/deseos.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor( public _deseosService: DeseosService,
               private router: Router,
               private alertCtrl: AlertController) {
    
  }

  //El 'async' se coloca cuando hay un await y esto convierte el metodo en una PROMESA.
  //Lo que hay dentro es un simple 'alert'
  async agregarLista(){    
    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',      
      inputs: 
      [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }      
      ],
      // buttons: ['OK'] Boton anterior.
      buttons: 
      [
        {
          text: 'Cancelar',
          role: 'cancel',
          // cssClass: 'secondary',
          // El handler es para que haga algo cuando se presiona el botón, como para comprobar
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'Crear',
          //Notese como en el handler se puede poner una variable que equivale al contenido
          //Lo que viene en 'data' es lo que se definió en los 'inputs' mas arriba, por lo tanto
          // debe devolver un objeto con un 'titulo', que es el que necesitamos para crear una lista. (Definido en el costructor de lmodelo en lista.model.ts)
          handler: (data) => {
            if(data.titulo.length > 0){

              // tengo que crear la lista:
              const idLista = this._deseosService.crearLista(data.titulo);
              
              // este metodo 'navigateByUrl' se usa cuando se sabe exactamente la url a la que se quiere acceder
              this.router.navigateByUrl(`/tabs/tab1/agregar/${ idLista }`);

            }
          }
        }
      ]
    });
    alert.present();
  }


}
