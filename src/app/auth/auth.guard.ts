import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { map, take } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
	const authenticationService = inject(AuthenticationService);
	const router = inject(Router);
	return authenticationService.isAuthenticated().pipe(
		take(1),
		map(isAuthenticated => {
			if (!isAuthenticated) {
				router.navigate(['/auth/login']).then();
			}
			return isAuthenticated;
		})
	);
};
