import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = "http://localhost:5000/api/emails";
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) { 
    
  }

 sendRegistrationEmail(recipient: string, token:string): Observable<unknown> {
    if (isPlatformBrowser(this.platformId)){
      return this.http.post(`${this.apiUrl}/registration_email`,  { recipient, token })
      }else{
        return of([])
        }
  }

  resendActivationLink(recipient:string, token:string): Observable<unknown>{
    if (isPlatformBrowser(this.platformId)){
      return this.http.post(`${this.apiUrl}/resend_activation_email`,  { recipient, token })
      }else{
        return of([])
        }
  }
}
