import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AlertComponent } from './shared_components/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QAstra';
  users:any[] = []

  constructor(private router: Router){
  }


  redirectToRegistration(){
    this.router.navigate(['/register'])
  }
}
