import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionZona } from './actualizacion-zona';

describe('ActualizacionZona', () => {
  let component: ActualizacionZona;
  let fixture: ComponentFixture<ActualizacionZona>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionZona]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionZona);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
