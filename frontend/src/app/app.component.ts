import { inject, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'QAstra';
  private apiservice = inject(ApiService);
  users:any[] = []

  constructor() {
    this.apiservice.getUsers().subscribe(data => {
      console.log('API Response:', data);
      this.users = data;
    }, error => {
      console.error('API Error:', error);
    });
  }
}
