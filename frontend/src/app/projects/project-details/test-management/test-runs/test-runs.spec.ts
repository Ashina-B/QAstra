import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRuns } from './test-runs';

describe('TestRuns', () => {
  let component: TestRuns;
  let fixture: ComponentFixture<TestRuns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRuns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestRuns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
