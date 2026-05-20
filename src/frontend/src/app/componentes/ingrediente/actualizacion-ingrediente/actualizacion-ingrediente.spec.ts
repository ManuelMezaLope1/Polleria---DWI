import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionIngrediente } from './actualizacion-ingrediente';

describe('ActualizacionIngrediente', () => {
  let component: ActualizacionIngrediente;
  let fixture: ComponentFixture<ActualizacionIngrediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionIngrediente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionIngrediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
