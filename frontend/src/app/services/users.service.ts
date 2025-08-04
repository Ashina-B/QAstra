import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
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

    getInitials(name: string): string{
      return name
        .split(' ')
        .filter(part => part.trim().length > 0)
        .map(part => part[0].toUpperCase())
        .join('');
    }
}
