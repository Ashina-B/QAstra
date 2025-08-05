import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object, private router: Router, private authService: AuthService) { }

  private apiUrl = 'http://localhost:5000/api/projects';

  createProject(requestData:any): Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        const token = this.authService.getToken();
        return this.http.post(`${this.apiUrl}/createProject`, requestData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }else{
        return of([])
      }
    }

  getProjects(): Observable<any> {
    if (isPlatformBrowser(this.platformId)){
      const token = this.authService.getToken();
        return this.http.get(`${this.apiUrl}/getProjects`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }else{
        return of([])
      }
  }

  getUserProjects(user_id: string): Observable<any> {
    if (isPlatformBrowser(this.platformId)){
      const token = this.authService.getToken();
      return this.http.get(`${this.apiUrl}/getUserProjects?user_id=${user_id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }else{
        return of([])
      }
  }
}
