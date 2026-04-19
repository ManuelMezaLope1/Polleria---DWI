import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionRol } from './actualizacion-rol';

describe('ActualizacionRol', () => {
  let component: ActualizacionRol;
  let fixture: ComponentFixture<ActualizacionRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionRol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionRol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
