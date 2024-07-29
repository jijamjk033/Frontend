import { Routes } from '@angular/router';
import { LoginComponent } from './modules/user/login/login.component';
import { RegisterComponent } from './modules/user/register/register.component';
import { HomeComponent } from './modules/user/home/home.component';
import { authGuard} from './guards/auth.guard';
import { ProfileComponent } from './modules/user/profile/profile.component';
import { AdminLoginComponent } from './modules/admin/login/login.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { adminAuthGuard } from './guards/adminAuth.guard';
import { NewUserComponent } from './modules/admin/new-user/new-user.component';
import { EditUserComponent } from './modules/admin/edit-user/edit-user.component';


export const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
    canActivate: [authGuard],
    
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }, 
  {
    path:'dashboard',
   component:DashboardComponent,
   canActivate: [adminAuthGuard],
  },
  {
    path:'adminlogin',
   component:AdminLoginComponent
  },
  {
    path: 'new', component: NewUserComponent
  },
  {
    path: 'edit', component: EditUserComponent
  },
  {
    path: "**",
    redirectTo: "login"
  }
];
