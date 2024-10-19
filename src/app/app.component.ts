import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { AuthService } from './auth/authServices/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './ui/toaster/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToasterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'timewise_ssr';
 
}
