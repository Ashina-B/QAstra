import { Component, input, output } from '@angular/core';
import { IconService } from '@ant-design/icons-angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ArrowRightOutline, BellOutline, CheckCircleOutline, CommentOutline, EditOutline, GiftOutline, GithubOutline, LockOutline, LogoutOutline, MessageOutline, PhoneOutline, ProfileOutline, QuestionCircleOutline, SettingOutline, UnorderedListOutline, UserOutline, WalletOutline } from '@ant-design/icons-angular/icons';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [NgScrollbarModule,CommonModule, NgbNavModule, NzIconModule],
  templateUrl: './nav-right.component.html',
  styleUrl: './nav-right.component.css'
})
export class NavRightComponent {

  styleSelectorToggle = input<boolean>();
  Customize = output();
  windowWidth: number;
  screenFull: boolean = true;

  constructor(private iconService: IconService) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
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
      ]
    );
  }

  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile'
    },
    {
      icon: 'user',
      title: 'View Profile'
    },
    {
      icon: 'profile',
      title: 'Social Profile'
    },
    {
      icon: 'wallet',
      title: 'Billing'
    }
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support'
    },
    {
      icon: 'user',
      title: 'Account Settings'
    },
    {
      icon: 'lock',
      title: 'Privacy Center'
    },
    {
      icon: 'comment',
      title: 'Feedback'
    },
    {
      icon: 'unordered-list',
      title: 'History'
    }
  ];
}
