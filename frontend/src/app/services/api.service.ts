import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:5000/api/users';
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getUsers(): Observable<any> {
    if (isPlatformBrowser(this.platformId)){
      return this.http.get(`${this.apiUrl}`);
    }else{
      return of([]);
    }
    
  }
}
