import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/pages/register/register.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { MagicLinkComponent } from './auth/pages/magic-link/magic-link.component';
import { SettingsComponent } from './auth/accountSettings/settings.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { NotificationsComponent } from './auth/accountSettings/notifications/notifications.component';
import { SecurityComponent } from './auth/accountSettings/security/security.component';
import { ProfileSettingsComponent } from './auth/accountSettings/profile-settings/profile-settings.component';
import { UpdateNameComponent } from './auth/accountSettings/update-name/update-name.component';
import { UpdatePrimaryEmailComponent } from './auth/accountSettings/update-primary-email/update-primary-email.component';
import { UpdateSecondaryEmailComponent } from './auth/accountSettings/update-secondary-email/update-secondary-email.component';
import { VerifySecondEmailComponent } from './auth/accountSettings/verify-second-email/verify-second-email.component';
import { VerifyPrimaryEmailOTPComponent } from './auth/accountSettings/verify-primary-email-otp/verify-primary-email-otp.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: ResetPasswordComponent },
  { path: 'verify-magic-link', component: MagicLinkComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

  
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile-settings', pathMatch: 'full' },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'security', component: SecurityComponent },
      { path: 'profile-settings', component: ProfileSettingsComponent },
      { path: 'update-name', component: UpdateNameComponent },
      { path: 'update-primary-email', component: UpdatePrimaryEmailComponent },
      { path: 'update-secondary-email', component: UpdateSecondaryEmailComponent },
      { path: 'verify-secondary-email', component: VerifySecondEmailComponent },
      { path: 'verify-otp-primary-email-update', component: VerifyPrimaryEmailOTPComponent },
    ],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/' }, 
];
