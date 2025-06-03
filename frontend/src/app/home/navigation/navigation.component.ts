import { Component, Inject, Output, EventEmitter, PLATFORM_ID } from '@angular/core';
import { NavContentComponent } from './nav-content/nav-content.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [ NavContentComponent ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'] // typo fix: `styleUrls` not `styleUrl`
})
export class NavigationComponent {
  @Output() NavCollapsedMob = new EventEmitter<void>();

  navCollapsedMob = false;
  windowWidth: number = 1024; // default fallback

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(window.location.href);
      this.windowWidth = window.innerWidth;
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
