import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:'signup',component:SignupComponent,
        children:[
            {path:'',component:LoginComponent, outlet:'login'},
        ]
    },
    {path:'login',component:LoginComponent},
    {path:'dashboard/:id',component:DashboardComponent, canActivate: [authGuard]},
    {path:'profile/:id',component:ProfileComponent, canActivate: [authGuard]},
    {path:'',redirectTo:'/signup',pathMatch:'full'},
    {path:"**",redirectTo:'/signup',pathMatch:'full'}
];
