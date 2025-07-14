import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../shared_components/alert/alert.component';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.css'
})
export class AccountActivationComponent {
  title!:string;
  message!: string;
  action!:string;
  resendActivationLinkForm!: FormGroup
  errormessage!:string;
  token: string | null = null;
  @ViewChild(AlertComponent) appAlert!: AlertComponent;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private emailService: EmailService,
    private router:Router,
    private formBuilder: FormBuilder,
  ){ }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if(this.token){
      this.userService.activateAccount(this.token).subscribe({
        next: (response) => {
          this.title = response.title;
          this.message = response.message;
          this.action = response.action;
        },
        error: (error) => {
          this.title = error.error.title;
          this.message = error.error.message;
          this.action = error.error.action;
          console.error(error);
        }
      });
    }

    this.resendActivationLinkForm = this.formBuilder.group({
      emailAddress: new FormControl('', [Validators.required, Validators.email])
    }) 
    
  }

  executeAction() {
    switch (this.action) {
      case 'Go to Home':
        this.goToHome();
        break;
      case 'Go to Login':
        this.goToLogin();
        break;
      case 'Resend Activation Link':
        this.resendActivationLink();
        break;
      default:
        console.warn('Invalid action:', this.action);
    }
  }

  goToHome(){
    this.router.navigate([''])
  }

  goToLogin(){
    this.router.navigate(['login'])
  }

  resendActivationLink(){  
    const email = this.resendActivationLinkForm.get('emailAddress')?.value

    if (email == '') {
      this.errormessage = 'Email address is required'; 
      return;
  }
    if (this.token){
      this.errormessage = ''
      this.emailService.resendActivationLink(email, this.token).subscribe({
        next: (response) => {
          this.appAlert.showAlert(
            'Activation Link Sent Successfully ✅',
            response.message,
            'success'
          )
        }, error: (error) => {
          console.log(error)
          this.appAlert.showAlert(
            'Failed ❌',
            error.error.message,
            'error'
          )
        }
      })
    }
  }
}
