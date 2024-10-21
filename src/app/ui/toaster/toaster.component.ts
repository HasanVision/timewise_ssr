import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../services/toasterService';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent implements OnInit {
  message: string | null = null;
  type: string = 'info';
  constructor(private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.toasterService.getMessage().subscribe((toast) => {
      this.message = toast.message;
      this.type = toast.type;
      setTimeout(() => this.close(), 5000);
    });
  }

  close() {
    this.message = null;
  }

}
