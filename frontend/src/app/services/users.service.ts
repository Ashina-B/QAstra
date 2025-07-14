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
  
    getUsers(): Observable<unknown> {
    if (isPlatformBrowser(this.platformId)){
      return this.http.get(`${this.apiUrl}/getUsers`);
    }else{
      return of([]);
    }
      
    }

    registerUser(requestData:unknown): Observable<unknown> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post(`${this.apiUrl}/registerUser`, requestData)
      }else{
        return of([])
      }
    }

    activateAccount(token:string):Observable<unknown> {
      if (isPlatformBrowser(this.platformId)){
        return this.http.post(`${this.apiUrl}/activateAccount`, { token })
      }else{
        return of([])
      }
    }
}
