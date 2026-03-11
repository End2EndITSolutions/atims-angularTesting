import { TestBed } from '@angular/core/testing';

import { NgxTestLibraryService } from './ngx-test-library.service';

describe('NgxTestLibraryService', () => {
  let service: NgxTestLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTestLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
