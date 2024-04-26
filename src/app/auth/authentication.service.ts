import {inject, Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  Auth,
  AuthProvider,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "@angular/fire/auth";
import firebase from "firebase/compat";
import {BehaviorSubject, catchError, from, Observable, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

interface CreateUserDTO {
  email: string;
  firstName: string;
  lastName: string;
}

interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  backendUrl = environment.backendUrl;
  currentUserSource = new BehaviorSubject<firebase.User | null>(null);
  authLoadingSource = new BehaviorSubject<boolean>(true);
  tokenSource = new BehaviorSubject<string | null>(null);
  private readonly googleAuthProvider: GoogleAuthProvider;
  private readonly githubAuthProvider: GithubAuthProvider;
  private auth: Auth = inject(Auth);

  constructor(
    private angularFireAuth: AngularFireAuth,
    private http: HttpClient
  ) {
    this.googleAuthProvider = new GoogleAuthProvider();
    this.githubAuthProvider = new GithubAuthProvider();
    this.angularFireAuth.authState.subscribe((authState) => {
      if (this.authLoadingSource.value) {
        this.authLoadingSource.next(false);
      }
      this.currentUserSource.next(authState);
      if (authState) {
        authState.getIdToken().then((token) => {
          this.tokenSource.next(token);
        });
      } else {
        this.tokenSource.next(null);
      }
    });
  }

  getAuthenticated()
  {
    return this.angularFireAuth.user;
  }

  tryAuthenticate()
  {
    return this.http.get(`${this.backendUrl}/users/protected`);
  }


  signUpWithProviderPopup(
    firstname: string,
    lastname: string,
    providerToUse: 'Goolge' | 'Github'
  ) {
    let provider: AuthProvider;
    switch (providerToUse) {
      case 'Goolge':
        provider = this.googleAuthProvider;
        break;
      case 'Github':
        provider = this.githubAuthProvider;
        break;
      default:
        throw new Error('Provider not supported');
    }

    return from(signInWithPopup(this.auth, provider)).pipe(
      switchMap(userCredentials => {
        const userCreated = userCredentials.user;
        console.log('userCreated', userCreated);
        // IdP data available using getAdditionalUserInfo(result)
        console.log('userCreated', getAdditionalUserInfo(userCredentials));
        if (userCreated.email === null) {
          throw new Error('User email is null');
        }
        return this.saveUserDetails({
          email: userCreated.email,
          firstName: firstname,
          lastName: lastname,
        });
      }),
      catchError(error => {
        console.error('shiiiid', error);
        // Re-throw or handle the error as needed
        throw error;
      })
    );
  }

  signInWithGooglePopup() {
    return from(signInWithPopup(this.auth, this.googleAuthProvider))
  }

  signUpWithEmail(email: string, password: string, createUserDTO: CreateUserDTO) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      tap(userCredential => {
        const user = userCredential.user;
        alert(`User ${user.email} signed up successfully`);
      }),
      switchMap(() => {
        return this.saveUserDetails(createUserDTO);
      }),
      catchError(error => {
        console.error('shiiiid', error.code, error.message);
        throw error;
      })
    );
  }

  logInWithEmailAndPassword(email: string, password: string) {
    return from(this.angularFireAuth.signInWithEmailAndPassword(email, password));

  }

  logout() {
    this.angularFireAuth.signOut().then();
  }

  private saveUserDetails(user: CreateUserDTO) {
    return this.http.post<UserDTO>(`${this.backendUrl}/users`, user);
  }
}
