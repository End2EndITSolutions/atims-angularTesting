import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }
/**
 * Tester function that increments passed number
 * @param num Number that needs to incremented
 * @returns 
 */
  increment(num: number){
    num = num + 1;
    console.log(num);
    return num
  }
}
