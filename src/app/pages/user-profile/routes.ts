import { Routes } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userProfileReducers } from '../../store/user-profile/user-profile.reducers';
import { UserProfileEffects } from '../../store/user-profile/user-profile.effects';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./user-profile.component').then(m => m.UserProfileComponent),
    canActivate: [AuthGuard],
    providers: [
      provideState({ name: 'userProfile', reducer: userProfileReducers }),
      provideEffects(UserProfileEffects),
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
