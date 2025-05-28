import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlertComponent } from '../../shared_components/alert/alert.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPasswordForm!:FormGroup;
  isSubmitting = false;
  errorMessage!:string;
  password!:string;
  token:string | null = null;
  @ViewChild(AlertComponent) appAlert!: AlertComponent;

  constructor(
        private usersService: UsersService, 
        private formBuilder: FormBuilder, 
        private router: Router,
        private route: ActivatedRoute,
      ){}

  ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token');

        this.resetPasswordForm = this.formBuilder.group({
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
      if(this.resetPasswordForm.valid && this.token){
        this.password = this.resetPasswordForm.get('password')?.value
        this.usersService.resetPassword(this.token, this.password).subscribe({
          next: (response) => {
            this.appAlert.showAlert(
              'Password Reset Sucessful ✅', 
              response.message, 
              'success' );
            this.router.navigate(['login'])
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
