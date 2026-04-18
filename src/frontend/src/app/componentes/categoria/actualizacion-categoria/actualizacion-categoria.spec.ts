import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionCategoria } from './actualizacion-categoria';

describe('ActualizacionCategoria', () => {
  let component: ActualizacionCategoria;
  let fixture: ComponentFixture<ActualizacionCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionCategoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
