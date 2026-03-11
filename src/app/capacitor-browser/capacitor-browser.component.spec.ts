import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitorBrowserComponent } from './capacitor-browser.component';

describe('CapacitorBrowserComponent', () => {
  let component: CapacitorBrowserComponent;
  let fixture: ComponentFixture<CapacitorBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacitorBrowserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacitorBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
