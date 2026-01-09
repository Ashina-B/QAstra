import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { General } from './general';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('General', () => {
  let component: General;
  let fixture: ComponentFixture<General>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [General],
      providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      provideRouter([]), 
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({
            get: (key: string) => key === 'projectId' ? '123' : null
          }),
          parent: {
            paramMap: of({
              get: () => '123'
            })
          }
        }
      }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(General);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

