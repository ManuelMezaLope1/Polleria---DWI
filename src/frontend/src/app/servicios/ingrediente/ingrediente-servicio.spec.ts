import { TestBed } from '@angular/core/testing';

import { IngredienteServicio } from './ingrediente-servicio';

describe('IngredienteServicio', () => {
  let service: IngredienteServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredienteServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
