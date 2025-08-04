import { Routes } from '@angular/router';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { HomeComponent } from './home/home.component';
import { AccountActivationComponent } from './users/account-activation/account-activation.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CreateProjectComponnet } from './projects/create-project/create-project';

export const routes: Routes = [
    {path: '', component: HomeComponent, 
        children:[
            {path: "dashboard", component: DashboardComponent}
        ],
        canActivate: [authGuard]
    },
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'activate-account', component:AccountActivationComponent},
    {path: 'reset-password', component:ResetPasswordComponent},
    {path: "projects", component: ProjectsComponent},
    {path: "create-project", component: CreateProjectComponnet}
];
