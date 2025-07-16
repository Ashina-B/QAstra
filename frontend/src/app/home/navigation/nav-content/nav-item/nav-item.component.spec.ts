import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavItemComponent } from './nav-item.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              data: {},
              paramMap: new Map(),
              queryParamMap: new Map()
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;

    component.item = {
      id: '',
      title: '',
      icon: '',
      url: '/dashboard',
      type: 'item',
      children: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


