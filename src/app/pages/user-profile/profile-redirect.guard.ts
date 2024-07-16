import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../../auth/authentication.service';
import { UserDTO } from '../../auth/DTO/user.dto';

export const ProfileRedirectGuard: CanActivateFn = (
	route: ActivatedRouteSnapshot
): Observable<boolean> => {
	const authService = inject(AuthenticationService);
	const router = inject(Router);

	return authService.currentUserSource.pipe(
		map((user: UserDTO | null) => {
			const userId = Number(route.paramMap.get('userId'));
			if (user && user.id === userId) {
				router.navigate(['/profile']).then();
				return false;
			}
			return true;
		})
	);
};
