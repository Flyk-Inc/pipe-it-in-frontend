import { Component } from '@angular/core';
import {AuthenticationService} from "../../../auth/authentication.service";

@Component({
  selector: 'app-test-authenticated',
  standalone: true,
  imports: [],
  templateUrl: './test-authenticated.component.html',
  styleUrl: './test-authenticated.component.css'
})
export class TestAuthenticatedComponent {
  response: object = {};

  constructor(private authenticationSetvice: AuthenticationService) {
  }

  askAuth() {
    this.authenticationSetvice.tryAuthenticate().subscribe({
      next: (response) => {
        this.response = response;
      },
      error: (error) => {
        this.response = error;
      }

    });
  }

  responseToString() {
    return JSON.stringify(this.response);
  }
}
