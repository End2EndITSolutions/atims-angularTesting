import { Component, Input, Output, OnInit,EventEmitter } from '@angular/core';

@Component({
    selector: 'app-child-component',
    templateUrl: './child-component.component.html',
    styleUrls: ['./child-component.component.css'],
    standalone: false
})
export class ChildComponentComponent implements OnInit {
  @Input() incomingMessage: string;
  @Output() outgoingMessage = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {

  }

  resetMessage(){
    this.incomingMessage = 'MESSAGE RESET FROM CHILD'
    this.outgoingMessage.emit(this.incomingMessage);
  }
}
