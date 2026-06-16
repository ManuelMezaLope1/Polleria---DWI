import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCocinero } from './dashboard-cocinero';

describe('DashboardCocinero', () => {
  let component: DashboardCocinero;
  let fixture: ComponentFixture<DashboardCocinero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCocinero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCocinero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
