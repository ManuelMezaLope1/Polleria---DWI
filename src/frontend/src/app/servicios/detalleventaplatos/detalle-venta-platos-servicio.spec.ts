import { TestBed } from '@angular/core/testing';

import { DetalleVentaPlatosServicio } from './detalle-venta-platos-servicio';

describe('DetalleVentaPlatosServicio', () => {
  let service: DetalleVentaPlatosServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleVentaPlatosServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
