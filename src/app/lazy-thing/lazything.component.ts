import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-lazything',
    templateUrl: './lazything.component.html',
    styleUrls: ['./lazything.component.css'],
    standalone: false
})
export class LazythingComponent implements OnInit {
  @Input() childMessage: string;
  @Output() sendMessageEvent = new EventEmitter();
    
  constructor() { }
  ngOnInit(): void {
  }

  onLazyButtonClick(): void {
    this.sendMessageEvent.emit('Lazy Component Loaded');
  }
}
