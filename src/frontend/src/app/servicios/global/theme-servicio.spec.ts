import { TestBed } from '@angular/core/testing';

import { ThemeServicio } from './theme-servicio';

describe('ThemeServicio', () => {
  let service: ThemeServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
