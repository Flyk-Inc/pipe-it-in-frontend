import {
	ApplicationConfig,
	importProvidersFrom,
	isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { backendAuthInterceptor } from './auth/backend-auth.interceptor';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { profileReducers } from './store/profile/profile.reducers';
import { ProfileEffects } from './store/profile/profile.effects';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(withInterceptors([backendAuthInterceptor])),
		MessageService,
		importProvidersFrom(BrowserAnimationsModule, MonacoEditorModule.forRoot()),
		provideStore({
			profile: profileReducers,
		}),
		provideEffects([ProfileEffects]),
		provideStoreDevtools({
			maxAge: 25, // Retains last 25 states
			logOnly: !isDevMode(), // Restrict extension to log-only mode
			autoPause: true, // Pauses recording actions and state changes when the extension window is not open
			trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code-home
			traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
			connectInZone: true, // If set to true, the connection is established within the Angular zone
		}),
		provideHighlightOptions({
			fullLibraryLoader: () => import('highlight.js'),
			lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
		}),
	],
};
