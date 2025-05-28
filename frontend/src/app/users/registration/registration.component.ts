import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/users.interface';
import { EmailService } from '../../services/email.service';
import { AlertComponent } from '../../shared_components/alert/alert.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  registrationForm!: FormGroup;
  user!: User;
  isSubmitting = false;
  errorMessage!:string
  @ViewChild(AlertComponent) appAlert!: AlertComponent;

  constructor(
    private usersService: UsersService, 
    private formBuilder: FormBuilder, 
    private emailService: EmailService
  ){}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
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
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      this.user = {
        username: this.registrationForm.get('username')?.value,
        email: this.registrationForm.get('emailAddress')?.value,
        password: this.registrationForm.get('password')?.value
      }
      this.usersService.registerUser(this.user).subscribe({
        next: (response) => {
          if (!this.emailService || !this.emailService.sendRegistrationEmail) {
            console.error('emailService is not defined or sendRegistrationEmail is missing');
            return;
        }
        const token = response.token;  
        this.emailService.sendRegistrationEmail(this.user.email, token).subscribe({
          next: (response) => {
            this.appAlert.showAlert(
              'Registration Successful ✅', 
              response.message, 
              'success' )
          },
          error: (error) => {
            this.isSubmitting = false;
            this.appAlert.showAlert(
              'Registration Failed ❌', 
              this.errorMessage = error?.error?.message,
              'error' )
          }
        })
        // 'A verification email has been sent to your inbox. Please check your email and follow the instructions to verify your account.'
        },
        error: (error) => {
          this.isSubmitting = false;
          this.errorMessage = error?.error?.message;
          this.appAlert.showAlert(
            'Registration Failed ❌', 
            this.errorMessage, 
            'error' )
        },
      })
    } else {
      console.log('Form Invalid');
    }
  }
  
}
