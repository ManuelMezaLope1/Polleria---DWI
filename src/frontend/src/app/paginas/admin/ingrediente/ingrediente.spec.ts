import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ingrediente } from './ingrediente';

describe('Ingrediente', () => {
  let component: Ingrediente;
  let fixture: ComponentFixture<Ingrediente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ingrediente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ingrediente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
