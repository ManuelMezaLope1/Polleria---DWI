import { TestBed } from '@angular/core/testing';

import { PedidoServicio } from './pedido-servicio';

describe('PedidoServicio', () => {
  let service: PedidoServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
