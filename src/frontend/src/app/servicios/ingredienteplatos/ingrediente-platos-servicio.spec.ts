import { TestBed } from '@angular/core/testing';

import { IngredientePlatosServicio } from './ingrediente-platos-servicio';

describe('IngredientePlatosServicio', () => {
  let service: IngredientePlatosServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientePlatosServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
