import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDetailsComponent } from './project-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { convertToParamMap } from '@angular/router';

describe('HomeComponent', () => {
  let component: ProjectDetailsComponent;
  let fixture: ComponentFixture<ProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetailsComponent,HttpClientTestingModule],
      providers: [
              {
                provide: ActivatedRoute,
                useValue: {
                  params: of({
                    get: (key: string) => key === 'projectName' ? 'Test Project' : null
                  }),
                  queryParams: of({
                    get: () => null
                  }),
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

    fixture = TestBed.createComponent(ProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


