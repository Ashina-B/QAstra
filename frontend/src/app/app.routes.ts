import { Routes } from '@angular/router';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { AccountActivationComponent } from './users/account-activation/account-activation.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { ProjectsComponent } from './projects/projects.component';

import { authGuard } from './guards/auth.guard';
import { CreateProjectComponnet } from './projects/create-project/create-project';
import { ProjectOverview } from './projects/project-details/project-overview/project-overview';
import { TestSuites } from './projects/project-details/test-management/test-suites/test-suites';
import { TestCases } from './projects/project-details/test-management/test-cases/test-cases';
import { TestRuns } from './projects/project-details/test-management/test-runs/test-runs';
import { TestPlan } from './projects/project-details/test-management/test-plan/test-plan';
import { Defects } from './projects/project-details/test-management/defects/defects';
import { General } from './projects/project-details/project-settings/general/general';
import { AccessControl } from './projects/project-details/project-settings/access-control/access-control';

export const routes: Routes = [
    {path: '', redirectTo: 'projects', pathMatch: 'full' },
    {path: 'project/:projectName', component: ProjectDetailsComponent, 
        children:[
            {path: "project-overview", component: ProjectOverview},
            {path: "test-suites", component: TestSuites},
            {path: "test-cases", component: TestCases},
            {path: "test-runs", component: TestRuns},
            {path: "test-plan", component: TestPlan},
            {path: "defects", component: Defects},
            {path: "settings/general", component: General},
            {path: "settings/access-control", component: AccessControl}
        ],
        canActivate: [authGuard]
    },
    {path: 'register', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'activate-account', component:AccountActivationComponent},
    {path: 'reset-password', component:ResetPasswordComponent},
    {path: "projects", component: ProjectsComponent, canActivate: [authGuard]},
];
