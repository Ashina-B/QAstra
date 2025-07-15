import { Routes } from '@angular/router';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountActivationComponent } from './users/account-activation/account-activation.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ProjectComponent } from './project/project.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: HomeComponent, 
        children:[
            {path: "project", component: ProjectComponent},
            {path: "dashboard", component: DashboardComponent}
        ]
    },
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'activate-account', component:AccountActivationComponent},
    {path: 'reset-password', component:ResetPasswordComponent}
];
