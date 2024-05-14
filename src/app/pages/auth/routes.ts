import {Routes} from "@angular/router";
import {loggedInAuthGuard} from "../../auth/logged-in-auth.guard";
import {AuthGuard} from "../../auth/auth.guard";

export const routes: Routes = [
  {
    path: 'sign-up',
    loadComponent: () => import('./sign-up-page/signup-page.component').then(m => m.SignupPageComponent),
    canActivate: [loggedInAuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login-page/login-page.component').then(m => m.LoginPageComponent),
    canActivate: [loggedInAuthGuard],
  },
  {
    path: 'restricted',
    loadComponent: () => import('../../restrictedpage/restrictedpage.component').then(m => m.RestrictedpageComponent),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
