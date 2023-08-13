import { Pipe, PipeTransform } from '@angular/core';
import { Poketype } from '../../interfaces/poketype';

@Pipe({
  standalone: true,
  name: 'getTypesString'
})
export class GetTypesStringPipe implements PipeTransform{
    transform(typesArray: Poketype[]): string{
        return typesArray.reduce((acc, el, i) => {
            const name = el.type.name
            
            return acc + name.charAt(0).toUpperCase() + name.slice(1) + (typesArray.length - 1 === i ? '' : '/')
        }, '')
    }
}