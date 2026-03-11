import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardTestComponent } from './keyboard-test.component';

describe('KeyboardTestComponent', () => {
  let component: KeyboardTestComponent;
  let fixture: ComponentFixture<KeyboardTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
