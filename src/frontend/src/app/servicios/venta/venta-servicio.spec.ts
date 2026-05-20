import { TestBed } from '@angular/core/testing';

import { VentaServicio } from './venta-servicio';

describe('VentaServicio', () => {
  let service: VentaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
