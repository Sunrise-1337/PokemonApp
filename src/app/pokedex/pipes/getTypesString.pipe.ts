import { Pipe, PipeTransform, inject } from '@angular/core';
import { Poketype } from '../../interfaces/poketype.interface';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  standalone: true,
  name: 'getTypesString'
})
export class GetTypesStringPipe implements PipeTransform{
    private capitalize = inject(TitleCasePipe)

    transform(typesArray: Poketype[]): string{
        return typesArray.reduce((acc, el, i) => {
            return acc + this.capitalize.transform(el.type.name) + (typesArray.length - 1 === i ? '' : '/')
        }, '')
    }
}