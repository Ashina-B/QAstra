import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSuites } from './test-suites';

describe('TestSuites', () => {
  let component: TestSuites;
  let fixture: ComponentFixture<TestSuites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSuites]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSuites);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
