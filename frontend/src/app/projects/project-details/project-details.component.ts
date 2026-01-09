import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProjectsService } from '../../services/projects';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavigationComponent, NavBarComponent, RouterModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  navCollapsed = false;
  navCollapsedMob = false;
  projectId: string | undefined;
  project: any;
  error_message: string| undefined;

  constructor(private route: ActivatedRoute, private router: Router, private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('projectId')!;
      // console.log('Project ID:', this.projectId);
    });

    if (this.projectId){
      this.projectsService.getProjectDetails(this.projectId).subscribe( {
        next: (response: any) => {
          this.project = response;
          // console.log('Project Details', this.project)
        },
        error: (error) => {
          this.error_message = error.error.message
        }
      });
    }
  }

  navMobClick() {
    this.navCollapsedMob = !this.navCollapsedMob;
  }

  navCollapse() {
    this.navCollapsed = !this.navCollapsed;
  }

  closeMenu() {
    this.navCollapsedMob = false;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  goToEditProject(projectName: string, url:string){
    this.router.navigate([`project/${projectName}/${url}`]);
  }
}
