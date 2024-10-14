import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: './login', pathMatch: 'full' },
];

