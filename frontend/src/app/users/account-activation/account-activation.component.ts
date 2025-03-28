import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-activation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.css'
})
export class AccountActivationComponent {
  title!:string;
  message!: string;
  action!:string;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private emailService: EmailService,
    private router:Router
  ){ }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if(token){
      this.userService.activateAccount(token).subscribe({
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
    console.log("work in progress")
  }
}
