import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, map } from 'rxjs/operators';
import { auth } from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  storage: Storage;

  constructor(
    private afauth: AngularFireAuth
    , private db: DbService
    , private router: Router
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => (user ? db.doc$(`users/${user.uid}`) : of(null)))
    );

    this.storage = window.localStorage;

    this.handleRedirect();
  }

  public uid() {
    return this.user$
      .pipe(
        take(1),
        map(u => u && u.uid)
      )
      .toPromise();
  }

  async anonymousLogin() {
    const credential = await this.afauth.signInAnonymously();
    return await this.updateUserData(credential.user);
  }

  private updateUserData({uid, email, displayName, photoURL, isAnonymous}) {
    const path = `users/${uid}`;

    const data = {
      uid
      , email
      , displayName
      , photoURL
      , isAnonymous
    };

    this.db.updateAt(path, data);
    return this.router.navigate(['/']);
  }

  async signOut() {
    await this.afauth.signOut();
    return this.router.navigate(['/']);
  }

  // GOOGLE AUTH

  setRedirect(val) {
    this.storage.setItem('authRedirect', val);
  }

  async isRedirect() {
    return await this.storage.getItem('authRedirect');
  }

  async googleLogin() {
    try {
      let user;

      await this.setRedirect(true);
      const provider = new auth.GoogleAuthProvider();
      user = await this.afauth.signInWithRedirect(provider);

      return await this.updateUserData(user);
    } catch (err) {
      console.log(err);
    }
  }

  // Hnadle login with redirect for web google auth
  private async handleRedirect() {
    if ((await !! this.isRedirect()) !== true) {
      return null;
    }

    const result = await this.afauth.getRedirectResult();

    if (result.user) {
      await this.updateUserData(result.user);
    }

    await this.setRedirect(false);

    return result;
  }
}
