import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../ui/button/button.component';
import { CardComponent } from '../../../ui/card/card.component';
import { SvgIconComponent } from 'src/assets/svg-icon.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    SvgIconComponent
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor() {}
  
}
