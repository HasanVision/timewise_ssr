import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title: string = '';
  @Input() showFooter: boolean = false;
  @Output() confirmAction = new EventEmitter<void>();
  @Output() closeAction = new EventEmitter<void>();

  closeModal() {
    this.closeAction.emit();
  }

  confirm() {
    this.confirmAction.emit();
  }
}