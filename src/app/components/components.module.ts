import { PipesModule } from './../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { ListasComponent } from './listas/listas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    //agregado el componente de las listas.
    ListasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  //agregado el array de exportacion:
  exports:[
    ListasComponent
  ]
})
export class ComponentsModule { }
