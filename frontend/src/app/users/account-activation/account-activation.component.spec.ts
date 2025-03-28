import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActivationComponent } from './account-activation.component';
<<<<<<< HEAD
import { provideRouter } from '@angular/router';
import { EmailService } from '../../services/email.service';
import { UsersService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
=======
>>>>>>> 8b138ea (Completed Registration functionality.)

describe('AccountActivationComponent', () => {
  let component: AccountActivationComponent;
  let fixture: ComponentFixture<AccountActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      providers: [
        { provide: HttpClient, useValue: {} },
        provideRouter([]), 
        UsersService,
        EmailService
        ],
=======
>>>>>>> 8b138ea (Completed Registration functionality.)
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
