import { Component, Inject, Output, EventEmitter, PLATFORM_ID, Input } from '@angular/core';
import { NavContentComponent } from './nav-content/nav-content.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ NavContentComponent, CommonModule ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'] // typo fix: `styleUrls` not `styleUrl`
})
export class NavigationComponent {
  @Input() navCollapsed = false;
  @Input() navCollapsedMob = false;
  @Output() navCollapsedMobChange = new EventEmitter<void>();

  // navCollapsedMob = false;
  windowWidth: number = 1024; // default fallback

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  ngOnChanges() {
    console.log('navCollapsed:', this.navCollapsed, 'navCollapsedMob:', this.navCollapsedMob);
  }


  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.navCollapsedMobChange.emit();
    }
  }
}
