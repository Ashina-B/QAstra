import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ResetPasswordComponent],
      declarations: [],
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
    }).compileComponents();
  
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [ResetPasswordComponent]
  //   })
  //   .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


