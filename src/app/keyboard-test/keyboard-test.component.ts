import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-keyboard-test',
    templateUrl: './keyboard-test.component.html',
    styleUrls: ['./keyboard-test.component.css'],
    standalone: false
})
export class KeyboardTestComponent implements OnInit {
  inputText:string = '';
  inputClicked: boolean = false;
  pokemonTeam: Array<string> = ['Iron Valiant','Haxorus','Tyranitar','Dragapult','Luxray'] 
  focusedPokemon: string
  constructor() { }

  ngOnInit(): void {
  }

  onFocus(e: string){
    this.focusedPokemon = e
  }

  onClick(e: string){
    
  }
}
