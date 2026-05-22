import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAlergia } from './registro-alergia';

describe('RegistroAlergia', () => {
  let component: RegistroAlergia;
  let fixture: ComponentFixture<RegistroAlergia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroAlergia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroAlergia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
