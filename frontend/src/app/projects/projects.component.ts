import { Component, ViewChild } from '@angular/core';
import { ProjectsService } from '../services/projects';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NavBarComponent } from '../projects/project-details/nav-bar/nav-bar.component';
import { UsersService } from '../services/users.service';
import { CreateProjectComponnet } from "./create-project/create-project";
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatBadgeModule, MatButtonModule, MatDividerModule, NavBarComponent, CreateProjectComponnet],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @ViewChild(CreateProjectComponnet) createProject!: CreateProjectComponnet;
  projects: any[] = [];
  user_id: string | null = null;
  error_message: string | null = null;

  options = [
    { icon: 'visibility', title: 'View project', url: '' },
    { icon: 'edit', title: 'Edit Project', url: "settings/general" },
    { icon: 'delete', title: 'Delete project',  url: '/projects' }
  ];

  constructor(private projectsService: ProjectsService, public usersService: UsersService, private authService: AuthService, private router:Router){}

  ngOnInit(){
    this.user_id = this.authService.getUserId();
    if (this.user_id){
      this.projectsService.getUserProjects(this.user_id).subscribe( {
        next: (response: any) => {
          this.projects = response;
        },
        error: (error) => {
          this.error_message = error.error.message
        }
  });
    }  
  }

  open_create_project(){
    this.createProject.displayForm();
  }

  onProjectCreated() {
    this.user_id = this.authService.getUserId();
    if (this.user_id) {
      this.projectsService.getUserProjects(this.user_id).subscribe({
        next: (response: any) => {
          this.projects = response;
        },
        error: (error) => {
          this.error_message = error.error.message
        }
      });
    }
  }

  goToProject(projectId: string){
    this.router.navigate([`project/${projectId}/project-overview`]);
  }

  goToSelectedOption(projectId: string, url:string){
    this.router.navigate([`project/${projectId}/${url}`]);
  }
}
