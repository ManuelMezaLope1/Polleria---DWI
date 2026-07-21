import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPedidoMesa } from './registro-pedido-mesa';

describe('RegistroPedidoMesa', () => {
  let component: RegistroPedidoMesa;
  let fixture: ComponentFixture<RegistroPedidoMesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPedidoMesa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPedidoMesa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
