import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Polleria } from './polleria';

describe('Polleria', () => {
  let component: Polleria;
  let fixture: ComponentFixture<Polleria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Polleria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Polleria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
