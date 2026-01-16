import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AccessControl } from './access-control';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AccessControl', () => {
  let component: AccessControl;
  let fixture: ComponentFixture<AccessControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessControl],
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

    fixture = TestBed.createComponent(AccessControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
