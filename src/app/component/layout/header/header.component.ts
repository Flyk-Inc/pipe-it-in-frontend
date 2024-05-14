import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../../../auth/authentication.service";
import {UserDTO} from "../../../auth/DTO/user.dto";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUserSubscription$ = this.authenticationService.currentUserSource;
  loggedInUser: UserDTO | null = null;
  tokenSubscription$ = this.authenticationService.tokenSource;
  token: string | null = null;

  constructor(protected authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loggedInUserSubscription$.subscribe((user) => {
      this.loggedInUser = user;
    });
    this.tokenSubscription$.subscribe((token) => {
      this.token = token;
    });
  }

  logout() {
    this.authenticationService.logout()
  }

  ngOnDestroy() {
    this.loggedInUserSubscription$.unsubscribe();
    this.tokenSubscription$.unsubscribe();
  }
}
