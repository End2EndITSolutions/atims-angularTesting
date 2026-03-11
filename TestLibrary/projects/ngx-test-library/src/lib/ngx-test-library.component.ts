import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'lib-ngx-test-library',
    template: `
    <p>
      ngx-test-library works!
    </p>
  `,
    styles: [],
    standalone: false
})
export class NgxTestLibraryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
