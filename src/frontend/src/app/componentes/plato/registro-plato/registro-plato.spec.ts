import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPlato } from './registro-plato';

describe('RegistroPlato', () => {
  let component: RegistroPlato;
  let fixture: ComponentFixture<RegistroPlato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPlato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPlato);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
