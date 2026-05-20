import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroIngrediente } from './registro-ingrediente';

describe('RegistroIngrediente', () => {
  let component: RegistroIngrediente;
  let fixture: ComponentFixture<RegistroIngrediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroIngrediente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroIngrediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
