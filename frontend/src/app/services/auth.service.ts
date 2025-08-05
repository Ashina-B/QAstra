import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object, private router: Router) { }

  private apiUrl = 'http://localhost:5000/api/users';

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

    loginUser(userCreds:any, keep_me_signed_in:boolean): Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post<any>(`${this.apiUrl}/loginUser`, userCreds).pipe(tap((res) => {
          if (res.Token) {
            if(keep_me_signed_in){
              localStorage.setItem('accessToken', res.Token);
              localStorage.setItem('userId', res.user_id)
            }else{
              sessionStorage.setItem('accessToken', res.Token);
              sessionStorage.setItem('userId', res.user_id)
            }     
          }
        }
      ));
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

    logout(): void{
       if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('accessToken');
          sessionStorage.removeItem('accessToken');
          localStorage.clear();
          sessionStorage.clear();
          this.router.navigate(['/login'])
      }
    }

    getToken(): string | null{
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
      }
      return null;
    }

    getUserId(): string | null{
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('userId') || sessionStorage.getItem('userId');
      }
      return null;
    }

    isAuthenticated(): boolean {
      return !!this.getToken();
    }
}

