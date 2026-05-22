import { TestBed } from '@angular/core/testing';

import { MensajeServicio } from './mensaje-servicio';

describe('MensajeServicio', () => {
  let service: MensajeServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajeServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
