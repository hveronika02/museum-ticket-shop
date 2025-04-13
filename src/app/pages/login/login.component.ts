import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';  // SnackBar importálása

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('');
  password = new FormControl('');
  isLoggedIn = false;
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  async login() {
    if (this.email.value && this.password.value) {
      this.authService.login(this.email.value, this.password.value).then(cred => {
        this.isLoggedIn = true;

        // Felhasználó sikeresen bejelentkezett, átirányítás a főoldalra
        this.authService.isUserLoggedIn().subscribe(user => {
          console.log(user);
          this.loggedInUser = user;
          localStorage.setItem('user', JSON.stringify(this.loggedInUser));
          this.router.navigateByUrl('/');
        });

      }).catch(error => {
        console.error(error);

        if (error.code === 'auth/user-not-found') {
          this.snackBar.open('No user found with this email. Please sign up.', '', {
            duration: 5000,
            panelClass: ['error-snackbar'] // Szín testreszabása
          });
        } else if (error.code === 'auth/wrong-password') {
          this.snackBar.open('Incorrect password. Please try again.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        } else {
          this.snackBar.open('Login failed. Please try again.', '', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      this.snackBar.open('Please enter both email and password.', '', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
