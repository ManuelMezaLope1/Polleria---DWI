import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionPlato } from './actualizacion-plato';

describe('ActualizacionPlato', () => {
  let component: ActualizacionPlato;
  let fixture: ComponentFixture<ActualizacionPlato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionPlato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionPlato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
