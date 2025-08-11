import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavigationComponent } from './navigation/navigation.component';

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
  projectName: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectName = params.get('projectName')!;
      console.log('Project Name:', this.projectName);
    });
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
}
