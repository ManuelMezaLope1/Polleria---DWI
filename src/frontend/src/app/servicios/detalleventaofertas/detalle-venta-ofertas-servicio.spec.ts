import { TestBed } from '@angular/core/testing';

import { DetalleVentaOfertasServicio } from './detalle-venta-ofertas-servicio';

describe('DetalleVentaOfertasServicio', () => {
  let service: DetalleVentaOfertasServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleVentaOfertasServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
