import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MagicLinkComponent } from './auth/pages/magic-link/magic-link.component';
import { SettingsComponent } from './auth/accountSettings/settings.component';
import { ForgotPasswordComponent} from './auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { NotificationsComponent } from './auth/accountSettings/notifications/notifications.component';
import { SecurityComponent } from './auth/accountSettings/security/security.component';
import { ProfileSettingsComponent } from './auth/accountSettings/profile-settings/profile-settings.component';


export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'verify-magic-link', component: MagicLinkComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'new-password', component: ResetPasswordComponent},
    { path: '', redirectTo: './login', pathMatch: 'full' },

    { path: 'settings/notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
    { path: 'settings/security', component: SecurityComponent, canActivate: [AuthGuard] },
    { path: 'settings/profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuard] }
];

