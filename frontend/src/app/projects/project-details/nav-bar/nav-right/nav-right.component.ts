import { Component, Inject, PLATFORM_ID, input, output } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { IconService } from '@ant-design/icons-angular';
import {  NgScrollbarModule,  ScrollbarVisibility} from 'ngx-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

import {
  ArrowRightOutline,
  BellOutline,
  CheckCircleOutline,
  CommentOutline,
  EditOutline,
  GiftOutline,
  GithubOutline,
  LockOutline,
  LogoutOutline,
  MessageOutline,
  PhoneOutline,
  ProfileOutline,
  QuestionCircleOutline,
  SettingOutline,
  UnorderedListOutline,
  UserOutline,
  WalletOutline
} from '@ant-design/icons-angular/icons';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, MatIconModule, MatMenuModule, MatBadgeModule, MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.css'
})
export class NavRightComponent {
  visibility = input<ScrollbarVisibility>('native');
  styleSelectorToggle = input<boolean>();
  Customize = output();

  windowWidth = 0;
  screenFull = true;

  profile = [
    { icon: 'edit', title: 'Edit Profile' },
    { icon: 'user', title: 'View Profile' },
    { icon: 'profile', title: 'Social Profile' },
    { icon: 'wallet', title: 'Billing' }
  ];

  

  notifications = [
  { icon: 'card_giftcard', message: `It's Cristina Danny's birthday today.`, subtext: '2 min ago', time: '3:00 AM' },
  { icon: 'chat', message: 'Aida Burg commented your post.', subtext: '5 August', time: '6:00 PM' },
  { icon: 'settings', message: 'Your Profile is Complete 60%', subtext: '7 hours ago', time: '2:45 PM' },
  { icon: 'call', message: 'Cristina Danny invited to join Meeting.', subtext: 'Daily scrum meeting time', time: '9:10 PM' }
];


  constructor(
    private iconService: IconService,
    @Inject(PLATFORM_ID) private platformId: object,
    private authService: AuthService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }

    this.iconService.addIcon(
      CheckCircleOutline,
      GiftOutline,
      MessageOutline,
      SettingOutline,
      PhoneOutline,
      LogoutOutline,
      UserOutline,
      EditOutline,
      ProfileOutline,
      QuestionCircleOutline,
      LockOutline,
      CommentOutline,
      UnorderedListOutline,
      ArrowRightOutline,
      BellOutline,
      GithubOutline,
      WalletOutline
    );
  }

  logout(){
    console.log("clicked logout")
    this.authService.logout();
  }
}
