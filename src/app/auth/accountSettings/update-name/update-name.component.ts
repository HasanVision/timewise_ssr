import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { CardComponent } from '../../../ui/card/card.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { LabelComponent } from '../../../ui/label/label.component';
import { TooltipComponent } from '../../../ui/tooltip/tooltip.component';
import { CommonModule } from '@angular/common';
import { CurrentUser } from '../../authServices/getCurrentUser';
import { environment} from '../../../../../config/environment'
import axios from 'axios';


@Component({
  selector: 'app-update-name',
  standalone: true,
  imports: [
    ButtonComponent,
    CardComponent,
    CommonModule,
    InputTextComponent,
    LabelComponent,
    TooltipComponent,
    ReactiveFormsModule
  ],
  templateUrl: './update-name.component.html',
  styleUrl: './update-name.component.css'
})
export class UpdateNameComponent implements OnInit {

  form: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor( private currentUser: CurrentUser , private fb: FormBuilder ) {
    this.form = this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
    })
  }

  async ngOnInit() {
    try {
      const user = await this.currentUser.getCurrentUser();
      if (user) {
        this.form.patchValue({
          firstname: user.firstName,
          lastname: user.lastName,
        });
      }
    } catch (error) {
      this.errorMessage = 'Error loading user name data.';
    }
  }


  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { firstname, lastname } = this.form.value;

      axios.post(`${environment.apiUrl}/settings/update-name`, { firstname, lastname }, { withCredentials: true })
        .then(response => {
          this.isLoading = false;
          this.successMessage = response.data.message;
        })
        .catch(error => {
          this.isLoading = false;
          this.errorMessage = 'Error updating name';
    })
  }
}

}
