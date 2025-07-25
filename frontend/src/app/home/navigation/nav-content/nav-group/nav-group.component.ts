import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { isPlatformBrowser, Location } from '@angular/common';
import { NavCollapseComponent } from '../nav-collapse/nav-collapse.component';
import { NavItemComponent } from '../nav-item/nav-item.component';

@Component({
  selector: 'app-nav-group',
  standalone: true,
  imports: [NavCollapseComponent, NavItemComponent],
  templateUrl: './nav-group.component.html',
  styleUrl: './nav-group.component.css'
})
export class NavGroupComponent implements OnInit {
  component: { title: string; icon: string; url: string; children: never[]; } | undefined;
  constructor(private location: Location,@Inject(PLATFORM_ID) private platformId: object) {}

  @Input({ required: true }) item!: NavigationItem;

  ngOnInit() {

    if (!isPlatformBrowser(this.platformId)) {
      return; // Don't run DOM code on the server
    }
    
    let current_url = this.location.path();
     
    // @ts-ignore
    if (this.location['_baseHref']) {
       
      // @ts-ignore
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent?.parentElement?.parentElement;
      const pre_parent = up_parent?.parentElement;
      const last_parent = up_parent?.parentElement?.parentElement?.parentElement?.parentElement;
      if (parent?.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent?.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (pre_parent?.classList.contains('coded-hasmenu')) {
        pre_parent.classList.add('coded-trigger');
        pre_parent.classList.add('active');
      }

      if (last_parent?.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        if (pre_parent?.classList.contains('coded-hasmenu')) {
          pre_parent.classList.add('coded-trigger');
        }
      }
      last_parent?.classList.add('active');
    }
  }
}
