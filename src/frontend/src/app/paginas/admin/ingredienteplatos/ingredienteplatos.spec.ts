import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ingredienteplatos } from './ingredienteplatos';

describe('Ingredienteplatos', () => {
  let component: Ingredienteplatos;
  let fixture: ComponentFixture<Ingredienteplatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ingredienteplatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ingredienteplatos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
