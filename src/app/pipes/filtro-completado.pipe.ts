import { Lista } from './../models/lista.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCompletado',
  
  //Esta condicion hace al pipe 'impuro'. 
  // Lo ponemos cuando Angular no detecta el cambio en un pipe.
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): Lista[] {
    return listas.filter( lista => lista.completada === completada );    
  }

}
