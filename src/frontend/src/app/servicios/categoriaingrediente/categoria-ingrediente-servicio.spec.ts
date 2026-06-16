import { TestBed } from '@angular/core/testing';

import { CategoriaIngredienteServicio } from './categoria-ingrediente-servicio';

describe('CategoriaIngredienteServicio', () => {
  let service: CategoriaIngredienteServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaIngredienteServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
