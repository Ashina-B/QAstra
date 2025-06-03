import { Component, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavLeftComponent } from './nav-left/nav-left.component';
import { NavRightComponent } from './nav-right/nav-right.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavLeftComponent, NavRightComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'] // Corrected typo: styleUrl -> styleUrls
})
export class NavBarComponent {
  @Output() NavCollapse = new EventEmitter<void>();
  @Output() NavCollapsedMob = new EventEmitter<void>();

  navCollapsed: boolean = false;
  navCollapsedMob: boolean = false;
  windowWidth: number = 1024; // Default to avoid SSR errors

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

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
