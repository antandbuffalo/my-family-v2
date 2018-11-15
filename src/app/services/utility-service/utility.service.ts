import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getToday(): string {
    let today = new Date();    
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  }
}
