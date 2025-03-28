import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActivationComponent } from './account-activation.component';
import { provideRouter } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { UsersService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';

describe('AccountActivationComponent', () => {
  let component: AccountActivationComponent;
  let fixture: ComponentFixture<AccountActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: {} },
        provideRouter([]), 
        UsersService,
        EmailService
        ],
      imports: [AccountActivationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
