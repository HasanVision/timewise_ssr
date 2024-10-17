import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MagicLinkComponent } from './auth/pages/magic-link/magic-link.component';
import { SettingsComponent } from './auth/settings/settings.component';
import { ForgotPasswordComponent} from './auth/pages/forgot-password/forgot-password.component';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'verify-magic-link', component: MagicLinkComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '', redirectTo: './login', pathMatch: 'full' },
];

