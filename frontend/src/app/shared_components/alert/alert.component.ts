import { CommonModule } from '@angular/common';
import { Component, ContentChild, ElementRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  cardTitle: string = '';
  cardClass: string = '';
  showContent: boolean = true;
  blockClass: string = '';
  headerClass: string = '';
  showHeader: boolean = true;
  padding: number = 20;
  type: 'success' | 'error' | 'warning' = 'success';
  message: string = '';

  isVisible = false;

  typeClass(): string {
    return this.type
  }

  showAlert(title:string, message: string, type: 'success' | 'error'| 'warning') {
    this.message = message;
    this.type = type;
    this.cardTitle = title;
    this.isVisible = true;

    // Auto-hide after 3 seconds
    // setTimeout(() => {
    //   this.isVisible = false;
    // }, 3000);
  }

  closeMessage() {
    this.isVisible = false;
  }

  @ContentChild('headerOptionsTemplate') headerOptionsTemplate!: TemplateRef<ElementRef>;
  @ContentChild('headerTitleTemplate') headerTitleTemplate!: TemplateRef<ElementRef>;
}
