import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from '../../shared_components/alert/alert.component';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!:FormGroup;
  forgotPasswordForm!:FormGroup;
  isSubmitting = false;
  forgotpasswordModal = false;
  errorMessage!:string
  userCreds:any;
  @ViewChild(AlertComponent) appAlert!: AlertComponent;

  constructor(
      private usersService: UsersService, 
      private formBuilder: FormBuilder, 
      private router: Router
    ){}
  
    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        emailAddress: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, this.passwordValidator])
      })
      this.forgotPasswordForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email])
      })
    }
  
    passwordValidator(control: AbstractControl): ValidationErrors | null {
      const value = control.value || '';
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[\W_]/.test(value);
  
      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        return { passwordStrength: 'Password must include uppercase, lowercase, number, and special character' };
      }
      return null;
    }

    forgotPassword(){
      if(this.forgotPasswordForm.valid){
        this.isSubmitting = true;
        let email = this.forgotPasswordForm.get('email')?.value
        this.usersService.forgotPassword(email).subscribe({
        next: (response) => {
          this.appAlert.showAlert(
              'Reset Email Sent ✅', 
              response.message, 
              'success' );
          this.forgotpasswordModal = false
        },
        error: (error) => {
          this.isSubmitting = false
          this.appAlert.showAlert(
              "Reset Email Failed ❌",
              error?.error?.message,
              "error"
            )
        }
      })
      }
    }

    onSubmit(){
      this.errorMessage = '';
      this.isSubmitting = true
      if(this.loginForm.valid){
        this.userCreds = {
          "email": this.loginForm.get('emailAddress')?.value,
          "password": this.loginForm.get('password')?.value
        }

        console.log(this.userCreds)

        this.usersService.loginUser(this.userCreds).subscribe({
          next: () => {
            this.router.navigate([''])
          },
          error: (error) => {
            this.isSubmitting = false;
            console.error('Error:', error);
            this.errorMessage = error?.error?.message;
            this.appAlert.showAlert(
              "Failed Login ❌",
              this.errorMessage,
              "error"
            )
          },
        })
      } else {
        console.log('Form Invalid');

      }
    }

}
