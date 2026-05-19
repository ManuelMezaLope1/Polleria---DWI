import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pruebasexternas } from './pruebasexternas';

describe('Pruebasexternas', () => {
  let component: Pruebasexternas;
  let fixture: ComponentFixture<Pruebasexternas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pruebasexternas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pruebasexternas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
