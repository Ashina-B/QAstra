import { Routes } from '@angular/router';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountActivationComponent } from './users/account-activation/account-activation.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'activate-account', component:AccountActivationComponent}
];
