import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { ButtonComponent } from '@app/ui/button/button.component';
import { environment } from '../../../../../config/environment';
import { InputTextComponent } from '@app/ui/input-text/input-text.component';
import { CardComponent } from '@app/ui/card/card.component';
import { LabelComponent } from '@app/ui/label/label.component';
import axios from 'axios';
import { CurrentUser } from '@app/auth/authServices/getCurrentUser';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-update-primary-email',
  standalone: true,
  imports: [ ButtonComponent, ReactiveFormsModule, InputTextComponent, LabelComponent, CardComponent, ReactiveFormsModule, CommonModule ],
  templateUrl: './update-primary-email.component.html',
  styleUrl: './update-primary-email.component.css'
})
export class UpdatePrimaryEmailComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private currentUser: CurrentUser) {

    this.form = this.fb.group({
      primaryEmail: new FormControl('', [Validators.required, Validators.email]),
    });
  }


  async ngOnInit() {
    try{
      const user = await this.currentUser.getCurrentUser();
      if (user) {
        this.form.patchValue({
          primaryEmail: user.primaryEmail,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.errorMessage = 'Failed to load user data.';
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { primaryEmail } = this.form.value;
      axios.post(`${environment.apiUrl}/settings/update-primary-email`, { primaryEmail} , { withCredentials: true })
      .then((response) => {
        this.isLoading = false;
        this.successMessage = response.data.message;
      })
      .catch((error) => {
        this.isLoading = false;
        this.errorMessage = error.response.data.message;
      });
    }
  }

}
