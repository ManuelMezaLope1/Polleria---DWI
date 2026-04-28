import { TestBed } from '@angular/core/testing';

import { ZonaServicio } from './zona-servicio';

describe('ZonaServicio', () => {
  let service: ZonaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
