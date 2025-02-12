import { Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './services/route-guard/route-guard';
import { AppComponent } from './app.component';
import { PaperIdeaDashboardComponent } from './paper-idea-dashboard/paper-idea-dashboard.component';
import { ProfessorGuard } from './services/route-guard/route-guard-d';
import { AdminGuard } from './services/route-guard/route-guard-a';


export const routes: Routes = [
    {path: 'frontpage', component: FrontpageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'a/dashboard', canActivate:[AdminGuard],component: AdminDashboardComponent},
    {path: '', canActivate: [AuthGuard], component: AppComponent},
    {path: 'd/dashboard', canActivate:[ProfessorGuard], component: PaperIdeaDashboardComponent}
];
