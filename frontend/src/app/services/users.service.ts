import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) { }

  private apiUrl = 'http://localhost:5000/api/users';
  
    getUsers(): Observable<any> {
    if (isPlatformBrowser(this.platformId)){
      return this.http.get(`${this.apiUrl}/getUsers`);
    }else{
      return of([]);
    }
      
    }

    registerUser(requestData:any): Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post(`${this.apiUrl}/registerUser`, requestData)
      }else{
        return of([])
      }
    }

    activateAccount(token:string):Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post(`${this.apiUrl}/activateAccount`, { token })
      }else{
        return of([])
      }
    }

    loginUser(userCreds:any): Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post(`${this.apiUrl}/loginUser`, userCreds)
      }else{
        return of([])
      }
    }

    forgotPassword(email:string): Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post(`${this.apiUrl}/forgotPassword`, { email })
      }else{
        return of([])
      }
    }

    resetPassword(token:string, newPassword:string): Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post(`${this.apiUrl}/resetPassword`, { token, newPassword })
      }else{
        return of([])
      }
    }
}
