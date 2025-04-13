import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: firebase.User | null = null;


  constructor( private auth: AngularFireAuth) { 
    this.auth.authState.subscribe((user) => {
      this.currentUser = user;
    });
  }
  getCurrentUser(): Promise<firebase.User | null> {
    return this.auth.currentUser;
  }
  


  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }


}
