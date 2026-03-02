import { Injectable } from '@angular/core';
import { IAdopter } from '../types/iadopter';

@Injectable({
  providedIn: 'root',
})
export class AdopterDataService {

  id = 0;
  adopterList: IAdopter[] = []

  constructor() {
    this.adopterList = [
      {
        "id": 0,
        "fullName": '',
        "email": '',
        "phone": '',
        "address": '',
        "housingType": '',
        "otherPets": '',
        "experience": '',
        "reason": '',
        "agreeTerms": false
      }
    ]
  }

  getAllAopters(): IAdopter[] {
    return this.adopterList
  }

  getAdopterById(AID: number): IAdopter[] {
    if (AID === 0) {
      return this.adopterList
    } else {
      return this.adopterList.filter((a) => a.id === AID)
    }
  }

  addAdopter(adopter: IAdopter) {
    this.adopterList.push(adopter)
  }

  updateAdopter(
    AID: number,
    property: Exclude<keyof IAdopter, "id">,
    newValue: IAdopter[Exclude<keyof IAdopter, "id">]) {
    if (!this.adopterList.some(a => a.id === AID)) {
      throw new Error("No such Adopter Exists")
    } else {
      let adopter = this.adopterList.find(a => a.id === AID)
      if (!adopter) {
        throw new Error("No such Adopter Exists")
      } else {
        (adopter as any)[property] = newValue;
      }
    }
  }

  dropAdopter(AID: number) {
    if (!this.adopterList.some(c => c.id === AID)) {
      throw new Error("We don't have that Adopter");
    }
    this.adopterList = this.adopterList.filter(c => c.id !== AID);
  }

}
