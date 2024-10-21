import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  template: `
    <img
      class="icon"
      [src]="iconUrl"
      [alt]="name"
      [attr.width]="size"
      [attr.height]="size"
    />
  `,
  styleUrl: './svg-icon.component.css',
})
export class SvgIconComponent implements OnInit {
  @Input() name!: string; 
  @Input() size: string = '24px'; 

  get iconUrl(): string {
    return `/icons/${this.name}.svg`;
  }

  ngOnInit() {
    if (!this.name) {
      console.error('Icon name is required');
    }
  }
}