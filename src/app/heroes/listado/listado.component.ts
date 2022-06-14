import { Component } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent {
  heroes: string[] = ['Spiderman', 'Hulk', 'Ironman', 'Thor', 'Capitan America'];
  heroeBorrado: string  = '';

  borrarHeroe(): void {
    this.heroeBorrado = this.heroes.pop() || '';
  }
}
