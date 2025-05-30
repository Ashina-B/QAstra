import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLeftComponent } from './nav-left.component';

describe('NavLeftComponent', () => {
  let component: NavLeftComponent;
  let fixture: ComponentFixture<NavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLeftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
