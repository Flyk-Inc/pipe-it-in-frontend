import {Component} from '@angular/core';
import {AuthenticationService} from "../../auth/authentication.service";
import {EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider} from "@angular/fire/auth";
import {auth as uiAuth} from "firebaseui";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent {
  firebaseUI!: uiAuth.AuthUI;

  constructor(private authenticationService: AuthenticationService, protected angularFireAuth: AngularFireAuth) {
  }

  ngOnInit() {
    // this.firebaseUI = new uiAuth.AuthUI(this.authenticationService.auth);
  }

  signInWithFireBaseUI() {
    this.firebaseUI.start('#firebaseui-auth-container', {
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          alert(JSON.stringify(authResult))
          return false;
        },
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'redirect',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        GoogleAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
        EmailAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url<button (click)="signInWithNative()">native</button>\n>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>'
    });
  }

  // signOut() {
  //   signOut(this.authenticationService.auth).then(() => {
  //       alert('Signed out')
  //     }
  //   ).catch((error) => {
  //     alert('Error signing out')
  //   });
  // }
}
