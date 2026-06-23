import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMesero } from './dashboard-mesero';

describe('DashboardMesero', () => {
  let component: DashboardMesero;
  let fixture: ComponentFixture<DashboardMesero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMesero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMesero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
