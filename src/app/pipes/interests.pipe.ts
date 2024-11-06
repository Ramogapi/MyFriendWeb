import { Pipe, PipeTransform } from '@angular/core';
import { CodeLookUp } from '../models/LookUp/codelookup';

@Pipe({
  name: 'interests'
})
export class InterestsPipe implements PipeTransform {

  transform(favourites: CodeLookUp[], searchKey: string): any[] {
    if (!favourites) return [];
    if (!searchKey) return [];
    if (searchKey == "") return favourites;

    searchKey = searchKey.toLowerCase();

    return favourites.filter(favourite => {
      return favourite.name.toLocaleLowerCase().includes(searchKey);
    });
  }
}
