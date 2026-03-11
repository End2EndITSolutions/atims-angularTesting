import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTestLibraryComponent } from './ngx-test-library.component';

describe('NgxTestLibraryComponent', () => {
  let component: NgxTestLibraryComponent;
  let fixture: ComponentFixture<NgxTestLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTestLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTestLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
