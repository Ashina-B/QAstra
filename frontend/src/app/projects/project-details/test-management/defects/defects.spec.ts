import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Defects } from './defects';

describe('Defects', () => {
  let component: Defects;
  let fixture: ComponentFixture<Defects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Defects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Defects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
