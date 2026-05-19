import { TestBed } from '@angular/core/testing';

import { MetodopagoServicio } from './metodopago-servicio';

describe('MetodopagoServicio', () => {
  let service: MetodopagoServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodopagoServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
