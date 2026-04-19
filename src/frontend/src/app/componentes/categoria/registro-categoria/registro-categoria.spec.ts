import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCategoria } from './registro-categoria';

describe('RegistroCategoria', () => {
  let component: RegistroCategoria;
  let fixture: ComponentFixture<RegistroCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCategoria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
