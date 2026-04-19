import { TestBed } from '@angular/core/testing';

import { PlatoServicio } from './plato-servicio';

describe('PlatoServicio', () => {
  let service: PlatoServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlatoServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
