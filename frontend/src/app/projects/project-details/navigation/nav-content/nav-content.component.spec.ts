import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NavContentComponent } from './nav-content.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('NavContentComponent', () => {
  let component: NavContentComponent;
  let fixture: ComponentFixture<NavContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavContentComponent],
      providers: [
              {
                provide: ActivatedRoute,
                useValue: {
                  params: of({}),
                  queryParams: of({}),
                  paramMap: of(convertToParamMap({ projectName: 'Test Project' })),
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

    fixture = TestBed.createComponent(NavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


