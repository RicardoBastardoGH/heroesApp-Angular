import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'heroeImage'
})
export class HeroImagePipe implements PipeTransform {

  transform( heroe: Heroe, ): string {
    return `assets/heroes/${ heroe.id }.jpg`;
  }

}
