import { TestBed } from '@angular/core/testing';

import { ConsultaMlServicio } from './consulta-ml-servicio';

describe('ConsultaMlServicio', () => {
  let service: ConsultaMlServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaMlServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
