import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirMesero } from './elegir-mesero';

describe('ElegirMesero', () => {
  let component: ElegirMesero;
  let fixture: ComponentFixture<ElegirMesero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirMesero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElegirMesero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
