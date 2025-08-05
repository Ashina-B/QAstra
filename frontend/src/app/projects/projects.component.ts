import { Component, ViewChild } from '@angular/core';
import { ProjectsService } from '../services/projects';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NavBarComponent } from '../home/nav-bar/nav-bar.component';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { CreateProjectComponnet } from "./create-project/create-project";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatBadgeModule, MatButtonModule, MatDividerModule, NavBarComponent, CreateProjectComponnet],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @ViewChild(CreateProjectComponnet) creatProject!: CreateProjectComponnet;
  projects: any[] = [];
  user_id: string | null = null;

  options = [
    { icon: 'visibility', title: 'View project', color: 'primary' },
    { icon: 'edit', title: 'Edit Project',color: 'accent' },
    { icon: 'delete', title: 'Delete project', color: 'warn' }
  ];

  constructor(private projectsService: ProjectsService, public usersService: UsersService, private authService: AuthService){}

  ngOnInit(){
    this.user_id = this.authService.getUserId();
    if (this.user_id){
      this.projectsService.getUserProjects(this.user_id).subscribe((data: any[]) => {
      this.projects = data;
  });
    }  
  }

  open_create_project(){
    this.creatProject.displayForm();
  }
}
