import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionAlergia } from './actualizacion-alergia';

describe('ActualizacionAlergia', () => {
  let component: ActualizacionAlergia;
  let fixture: ComponentFixture<ActualizacionAlergia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionAlergia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionAlergia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
