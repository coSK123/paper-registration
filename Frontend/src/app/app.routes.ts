import { Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './services/route-guard/route-guard';
import { AppComponent } from './app.component';


export const routes: Routes = [
    {path: 'frontpage', component: FrontpageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'a/dashboard', component: AdminDashboardComponent},
    {path: '', canActivate: [AuthGuard], component: AppComponent},
];
