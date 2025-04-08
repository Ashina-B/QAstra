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
  isSubmitting = false;
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
