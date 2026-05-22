import { TestBed } from '@angular/core/testing';

import { DetalleVentaServicio } from './detalle-venta-servicio';

describe('DetalleVentaServicio', () => {
  let service: DetalleVentaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleVentaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
