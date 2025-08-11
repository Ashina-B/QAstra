import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCollapseComponent } from './nav-collapse.component';

describe('NavCollapseComponent', () => {
  let component: NavCollapseComponent;
  let fixture: ComponentFixture<NavCollapseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavCollapseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavCollapseComponent);
    component = fixture.componentInstance;
    component.item = {
      id: '',
      title: '',
      icon: 'home',
      url: '/dashboard',
      type: 'group',
      children: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
