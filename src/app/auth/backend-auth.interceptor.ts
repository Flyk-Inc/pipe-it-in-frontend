import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";

export const backendAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticationService = inject(AuthenticationService);
  const backendUrl = environment.backendUrl;
  const token = authenticationService.tokenSource.value;
  if (token) {
    if (req.url.includes(backendUrl)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next(req);
    }
  }

  return next(req);
}

