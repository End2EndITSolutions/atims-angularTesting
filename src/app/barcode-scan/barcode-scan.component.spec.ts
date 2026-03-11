import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeScanComponent } from './barcode-scan.component';

describe('BarcodeScanComponent', () => {
  let component: BarcodeScanComponent;
  let fixture: ComponentFixture<BarcodeScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeScanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarcodeScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
