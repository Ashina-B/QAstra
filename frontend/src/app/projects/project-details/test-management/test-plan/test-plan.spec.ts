import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPlan } from './test-plan';

describe('TestPlan', () => {
  let component: TestPlan;
  let fixture: ComponentFixture<TestPlan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestPlan]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPlan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
