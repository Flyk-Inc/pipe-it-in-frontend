import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {backendAuthInterceptor} from "./auth/backend-auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([backendAuthInterceptor])),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAuth(() => getAuth())),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
  ],
};
