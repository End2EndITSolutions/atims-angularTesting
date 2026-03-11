import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazythingComponent } from './lazything.component';

describe('LazythingComponent', () => {
  let component: LazythingComponent;
  let fixture: ComponentFixture<LazythingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazythingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LazythingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
