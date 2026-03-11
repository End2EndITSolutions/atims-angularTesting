import { Component, OnInit } from '@angular/core';
import { TestService } from 'ngx-test-library';

@Component({
    selector: 'app-library-test',
    templateUrl: './library-test.component.html',
    styleUrls: ['./library-test.component.css'],
    standalone: false
})
export class LibraryTestComponent implements OnInit {
  counter: number = 0;
  constructor(private testService: TestService) { }

  ngOnInit(): void {

  }

  incrementIterator(){
    console.log("Button Clicked");
    this.counter = this.testService.increment(this.counter);
  }
}
