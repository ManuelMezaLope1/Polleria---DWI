import { TestBed } from '@angular/core/testing';

import { AlergiaServicio } from './alergia-servicio';

describe('AlergiaServicio', () => {
  let service: AlergiaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlergiaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
