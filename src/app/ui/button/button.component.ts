import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from '../../../assets/svg-icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label: string = ''; 
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false; 
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'link'| 'outline' | 'ghost' = 'primary';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon: string = ''; 
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fullWidth: boolean = false;
  @Input() iconSize: string = '24px'; // Optional size for the icon
}

// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-button',
//   standalone: true,
//   imports: [ CommonModule ],
//   templateUrl: './button.component.html',
//   styleUrl: './button.component.css'
// })
// export class ButtonComponent {
//   @Input() label: string = ''; 
//   @Input() type: 'button' | 'submit' | 'reset' = 'button';
//   @Input() disabled: boolean = false; 
//   @Input() variant: 'primary' | 'secondary' | 'danger' | 'link'| 'outline' | 'ghost' = 'primary' ;
//   @Input() size: 'small' | 'medium' | 'large' = 'medium';
//   @Input() icon: string = ''; 
//   @Input() iconPosition: 'left' | 'right' = 'left'; 
//   @Input() fullWidth: boolean = false;
// }
