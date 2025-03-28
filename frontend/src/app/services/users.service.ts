import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  private apiUrl = 'http://localhost:5000/api/users';
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
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
}
