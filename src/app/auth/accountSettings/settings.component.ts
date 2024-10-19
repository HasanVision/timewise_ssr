import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonComponent } from '../../ui/button/button.component';
import { CardComponent } from '../../ui/card/card.component';
import { InputTextComponent } from '../../ui/input-text/input-text.component';
import { LabelComponent } from '../../ui/label/label.component';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipComponent } from '../../ui/tooltip/tooltip.component';
import { CurrentUser } from '../authServices/getCurrentUser';
import axios from 'axios';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UpdatePrimaryEmailComponent } from './update-primary-email/update-primary-email.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdateSecondaryEmailComponent } from './update-secondary-email/update-secondary-email.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    InputTextComponent,
    LabelComponent,
    TooltipComponent,
    SideBarComponent,
    UpdateNameComponent,
    UpdatePrimaryEmailComponent,
    UpdateSecondaryEmailComponent
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';


constructor( private fb : FormBuilder, private currentUser: CurrentUser, private router : Router, private commonModule : CommonModule ) {
  this.form = this.fb.group({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.minLength(6)]),
  })
}


  
async ngOnInit() {
  try {
    const user = await this.currentUser.getCurrentUser();
    if (user) {
      this.form.patchValue({
        firstname: user.firstName,
        lastname: user.lastName,
        primaryEmail: user.primaryEmail,
      });
    }
  } catch (error) {
    this.errorMessage = 'Error loading user data.';
  }
}

  onSubmit() {
    
  }
}
