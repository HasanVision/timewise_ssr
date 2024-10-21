import { Component } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-setting-layout',
  standalone: true,
  imports: [
    SideBarComponent,
    RouterModule
  ],
  templateUrl: './setting-layout.component.html',
  styleUrl: './setting-layout.component.css'
})
export class SettingLayoutComponent {

}
