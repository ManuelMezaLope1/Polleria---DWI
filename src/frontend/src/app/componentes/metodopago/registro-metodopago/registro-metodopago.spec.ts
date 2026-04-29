import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMetodopago } from './registro-metodopago';

describe('RegistroMetodopago', () => {
  let component: RegistroMetodopago;
  let fixture: ComponentFixture<RegistroMetodopago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroMetodopago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroMetodopago);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
