import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionMetodopago } from './actualizacion-metodopago';

describe('ActualizacionMetodopago', () => {
  let component: ActualizacionMetodopago;
  let fixture: ComponentFixture<ActualizacionMetodopago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionMetodopago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionMetodopago);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
