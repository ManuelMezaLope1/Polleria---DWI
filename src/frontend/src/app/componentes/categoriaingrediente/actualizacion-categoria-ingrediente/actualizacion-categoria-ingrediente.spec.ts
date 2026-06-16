import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionCategoriaIngrediente } from './actualizacion-categoria-ingrediente';

describe('ActualizacionCategoriaIngrediente', () => {
  let component: ActualizacionCategoriaIngrediente;
  let fixture: ComponentFixture<ActualizacionCategoriaIngrediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionCategoriaIngrediente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionCategoriaIngrediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
