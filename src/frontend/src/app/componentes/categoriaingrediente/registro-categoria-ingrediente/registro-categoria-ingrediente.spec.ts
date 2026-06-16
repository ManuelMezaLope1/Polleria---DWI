import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCategoriaIngrediente } from './registro-categoria-ingrediente';

describe('RegistroCategoriaIngrediente', () => {
  let component: RegistroCategoriaIngrediente;
  let fixture: ComponentFixture<RegistroCategoriaIngrediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCategoriaIngrediente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCategoriaIngrediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
