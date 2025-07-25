import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { provideRouter } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [LoginComponent, HttpClientTestingModule],
    providers: [provideRouter([])] 
  }).compileComponents();

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     providers: [
  //       provideRouter([]), 
  //     ],
  //     imports: [LoginComponent]
  //   })
  //   .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
