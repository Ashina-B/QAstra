import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IconService } from '@ant-design/icons-angular';
import { MenuUnfoldOutline, MenuFoldOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  templateUrl: './nav-left.component.html',
  styleUrl: './nav-left.component.css'
})
export class NavLeftComponent {
  // public props
  navCollapsed = input.required<boolean>();
  NavCollapse = output();
  NavCollapsedMob = output();
  windowWidth: number;

  // Constructor
  constructor(private iconService: IconService) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(...[MenuUnfoldOutline, MenuFoldOutline, SearchOutline]);
  }

  // public method
  navCollapse() {
    this.NavCollapse.emit();
  }
}
