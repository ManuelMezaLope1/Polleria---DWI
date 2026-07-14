import { TestBed } from '@angular/core/testing';

import { MesaServicio } from './mesa-servicio';

describe('MesaServicio', () => {
  let service: MesaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
