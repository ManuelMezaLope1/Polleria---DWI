import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlato } from './lista-plato';

describe('ListaPlato', () => {
  let component: ListaPlato;
  let fixture: ComponentFixture<ListaPlato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPlato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPlato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
