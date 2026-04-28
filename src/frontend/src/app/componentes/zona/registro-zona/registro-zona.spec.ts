import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroZona } from './registro-zona';

describe('RegistroZona', () => {
  let component: RegistroZona;
  let fixture: ComponentFixture<RegistroZona>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroZona]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroZona);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
