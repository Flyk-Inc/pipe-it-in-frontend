import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {map} from "rxjs";

export const loggedInAuthGuard: CanActivateFn = () => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);
  return authenticationService.getAuthenticated().pipe(
    map((user) => {
      if (!user) {
        return true;
      } else {
        router.navigate(['/auth/login']).then();
        return false;
      }
    })
  );
};
