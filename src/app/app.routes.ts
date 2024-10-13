import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent }
];
