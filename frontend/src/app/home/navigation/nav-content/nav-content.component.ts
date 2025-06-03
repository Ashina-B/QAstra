import { LocationStrategy, Location } from '@angular/common';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [NgScrollbar, NavGroupComponent, NzIconModule],
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.css']
})
export class NavContentComponent implements OnInit{

  @Output() NavCollapsedMob = new EventEmitter<void>();

  navigations: NavigationItem[] = NavigationItems;

  // version
  title = 'Demo application for version numbering';

  windowWidth = window.innerWidth;

  constructor(
    private iconService: IconService,
    private location: Location,
    private locationStrategy: LocationStrategy
  ) {
    this.iconService.addIcon(
      ...[
        DashboardOutline,
        CreditCardOutline,
        FontSizeOutline,
        LoginOutline,
        ProfileOutline,
        BgColorsOutline,
        AntDesignOutline,
        ChromeOutline,
        QuestionOutline
      ]
    );
  }

  ngOnInit() {
    if (this.windowWidth < 1025) {
      (document.querySelector('.coded-navbar') as HTMLDivElement).classList.add('menupos-static');
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
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
    const nav = document.querySelector('app-navigation.coded-navbar');
    if (this.windowWidth < 1025 && nav?.classList.contains('mob-open')) {
      this.NavCollapsedMob.emit();
    }
  }

}
