import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOferta } from './registro-oferta';

describe('RegistroOferta', () => {
  let component: RegistroOferta;
  let fixture: ComponentFixture<RegistroOferta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroOferta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroOferta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
