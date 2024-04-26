import {Routes} from "@angular/router";
import {loggedInAuthGuard} from "../../auth/logged-in-auth.guard";

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
    path: 'test-auth',
    loadComponent: () => import('./test-authenticated/test-authenticated.component').then(m => m.TestAuthenticatedComponent),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
