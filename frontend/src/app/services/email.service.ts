import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = "http://localhost:5000/api/emails";
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) { 
    
  }

 sendRegistrationEmail(recipient: string, token:string) {
    if (isPlatformBrowser(this.platformId)){
      return this.http.post(`${this.apiUrl}/registration_email`,  { recipient, token }).subscribe({
        next: (res) => console.log('Email sent successfully:', res),
        error: (err) => console.error('Error sending email:', err)
      })
      }else{
        return of([])
        }
  }
}
