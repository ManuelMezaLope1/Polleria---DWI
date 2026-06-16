import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionUsuario } from './actualizacion-usuario';

describe('ActualizacionUsuario', () => {
  let component: ActualizacionUsuario;
  let fixture: ComponentFixture<ActualizacionUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
