import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, LocationStrategy, Location } from '@angular/common';
import { NavigationItem, NavigationItems } from '../navigation';
import { IconService } from '@ant-design/icons-angular';
import {
  DashboardOutline,
  CreditCardOutline,
  FontSizeOutline,
  LoginOutline,
  ProfileOutline,
  BgColorsOutline,
  AntDesignOutline,
  ChromeOutline,
  QuestionOutline
} from '@ant-design/icons-angular/icons';
import { NgScrollbar } from 'ngx-scrollbar';
import { NavGroupComponent } from './nav-group/nav-group.component';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [NgScrollbar, NavGroupComponent],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.css']
})
export class NavContentComponent implements OnInit {
  @Output() NavCollapsedMob = new EventEmitter<void>();
  navigations: NavigationItem[] = NavigationItems;
  title = 'Demo application for version numbering';

  windowWidth = 1024; // default fallback

  constructor(
    private iconService: IconService,
    private location: Location,
    private locationStrategy: LocationStrategy,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.iconService.addIcon(
      DashboardOutline,
      CreditCardOutline,
      FontSizeOutline,
      LoginOutline,
      ProfileOutline,
      BgColorsOutline,
      AntDesignOutline,
      ChromeOutline,
      QuestionOutline
    );

    // Safely access window only in browser
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.windowWidth < 1025) {
      const navbar = document.querySelector('.coded-navbar') as HTMLDivElement;
      navbar?.classList.add('menupos-static');
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = `a.nav-link[href='${current_url}']`;
    const ele = document.querySelector(link);
    if (ele) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger', 'active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger', 'active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger', 'active');
      }
    }
  }

  navMob() {
    if (isPlatformBrowser(this.platformId)) {
      const nav = document.querySelector('app-navigation.coded-navbar');
      if (this.windowWidth < 1025 && nav?.classList.contains('mob-open')) {
        this.NavCollapsedMob.emit();
      }
    }
  }
}
