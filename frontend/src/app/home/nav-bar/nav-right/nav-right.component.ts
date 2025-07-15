import { Component, Inject, PLATFORM_ID, input, output } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { IconService } from '@ant-design/icons-angular';
import {
  NgScrollbarModule,
  ScrollbarVisibility
} from 'ngx-scrollbar';
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

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [CommonModule, NgScrollbarModule, MatIconModule, MatTab, MatTabGroup],
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

  setting = [
    { icon: 'question-circle', title: 'Support' },
    { icon: 'user', title: 'Account Settings' },
    { icon: 'lock', title: 'Privacy Center' },
    { icon: 'comment', title: 'Feedback' },
    { icon: 'unordered-list', title: 'History' }
  ];

  constructor(
    private iconService: IconService,
    @Inject(PLATFORM_ID) private platformId: object
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
}
