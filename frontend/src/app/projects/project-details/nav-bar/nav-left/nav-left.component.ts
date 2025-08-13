import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IconService } from '@ant-design/icons-angular';
import {
  MenuUnfoldOutline,
  MenuFoldOutline,
  SearchOutline
} from '@ant-design/icons-angular/icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.css']
})
export class NavLeftComponent {
  @Input() navCollapsed!: boolean;
  @Output() NavCollapse = new EventEmitter<void>();
  @Output() NavCollapsedMob = new EventEmitter<void>();

  windowWidth = 1024; 

  constructor(
    private iconService: IconService,
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {
    this.iconService.addIcon(MenuUnfoldOutline, MenuFoldOutline, SearchOutline);

    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  navCollapse() {
    this.NavCollapse.emit();
  }
}
