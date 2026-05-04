import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionOferta } from './actualizacion-oferta';

describe('ActualizacionOferta', () => {
  let component: ActualizacionOferta;
  let fixture: ComponentFixture<ActualizacionOferta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionOferta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizacionOferta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
