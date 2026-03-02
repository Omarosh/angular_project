import { Injectable } from '@angular/core';
import { IBreeds } from '../types/ibreeds';

@Injectable({
  providedIn: 'root',
})
export class BreedDataService {

  breedsList:IBreeds[] = []
  constructor(){
    this.breedsList = [
    {
    "id":"abys",
    "name":"Abyssinian"
    },
    {
    "id":"beng",
    "name":"Bengal"
    }
    ]
  }

  getAllBreeds():IBreeds[]{
    return this.breedsList;
  }

  getBreedById(BID:string):IBreeds[]{
    if(BID==="") {
      return this.breedsList
    } else {
      return this.breedsList.filter((b)=>b.id === BID)
    }
  }
}
