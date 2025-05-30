import { Component, output } from '@angular/core';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';
import { NavCollapseComponent } from '../navigation/nav-content/nav-collapse/nav-collapse.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavLeftComponent, NavRightComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  // public props
  NavCollapse = output();
  NavCollapsedMob = output();

  navCollapsed: boolean = false ;
  windowWidth: number;
  navCollapsedMob: boolean;

  // Constructor
  constructor() {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  // public method
  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
