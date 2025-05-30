import { LocationStrategy } from '@angular/common';
import { Location } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, output } from '@angular/core';
import { NavigationItem, NavigationItems } from '../navigation'; 
import { IconService, IconDirective } from '@ant-design/icons-angular';
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
  styleUrl: './nav-content.component.css'
})
export class NavContentComponent implements OnInit{
  private location = inject(Location);
  private locationStrategy = inject(LocationStrategy);
  private iconService = inject(IconService);

  // public props
  NavCollapsedMob = output();

  navigations: NavigationItem[];

  // version
  title = 'Demo application for version numbering';

  navigation = NavigationItems;
  windowWidth = window.innerWidth;

  // Constructor
  constructor() {
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
    this.navigations = NavigationItems;
  }

  // Life cycle events
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
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const last_parent = up_parent?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
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
