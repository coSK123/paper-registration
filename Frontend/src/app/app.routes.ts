import { Routes } from '@angular/router';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: 'frontpage', component: FrontpageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];
