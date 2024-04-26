import {Routes} from '@angular/router';
import {authGuard} from "./auth/auth.guard";
import {loggedInAuthGuard} from "./auth/logged-in-auth.guard";

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/routes').then(m => m.routes),
  },
  {
    path: 'test',
    loadComponent: () => import('./component/login-button/login-button.component').then(m => m.LoginButtonComponent),
  },
  {
    path: 'routeforloggedinuser',
    loadComponent: () => import('./pages/auth/test/logged-in/logged-in.component').then(m => m.LoggedInComponent),
    canActivate: [authGuard]
  },
  {
    path: 'routeforloggedoutuser',
    loadComponent: () => import('./pages/auth/test/logged-out/logged-out.component').then(m => m.LoggedOutComponent),
    canActivate: [loggedInAuthGuard]
  }
];
