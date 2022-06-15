import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';
import { DbzService } from '../services/dbz.service';




@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent  {

  nuevo: Personaje = {
    nombre: 'Satan',
    poder: 150
  }

  

  // constructor( private DbzService: DbzService ) {}  // Inyeccion de dependencias
}
