import { TestBed } from '@angular/core/testing';

import { OfertaServicio } from './oferta-servicio';

describe('OfertaServicio', () => {
  let service: OfertaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
