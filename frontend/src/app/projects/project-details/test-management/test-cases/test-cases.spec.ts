import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCases } from './test-cases';

describe('TestCases', () => {
  let component: TestCases;
  let fixture: ComponentFixture<TestCases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCases]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCases);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
