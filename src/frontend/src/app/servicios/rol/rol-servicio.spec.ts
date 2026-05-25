import { TestBed } from '@angular/core/testing';

import { RolServicio } from './rol-servicio';

describe('RolServicio', () => {
  let service: RolServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
