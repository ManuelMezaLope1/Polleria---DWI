import { TestBed } from '@angular/core/testing';

import { ConsultaServicio } from './consulta-servicio';

describe('ConsultaServicio', () => {
  let service: ConsultaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
