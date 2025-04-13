import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importáljuk a Snackbar-t

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    }),
  });

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar // Injectáljuk a Snackbar szolgáltatást
  ) { }

  onSubmit() {
    if (this.signUpForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    // Biztosítjuk, hogy az értékek nem null vagy undefined
    const email = this.signUpForm.get('email')?.value ?? '';
    const password = this.signUpForm.get('password')?.value ?? '';
    const firstName = this.signUpForm.get('name.firstName')?.value ?? '';
    const lastName = this.signUpForm.get('name.lastName')?.value ?? '';

    // Ellenőrzés, ha a jelszó kevesebb, mint 6 karakter
    if (password.length < 6) {
      console.log('Password must be at least 6 characters');
      return;
    }

    // Ellenőrizzük, hogy a jelszavak egyeznek-e
    if (password !== this.signUpForm.get('rePassword')?.value) {
      console.log('Passwords do not match');
      return;
    }

    // Ha minden valid, folytathatjuk a regisztrációt
    this.authService.signup(email, password).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: email,
        username: email.split('@')[0],
        name: {
          firstName: firstName,
          lastname: lastName
        }
      };

      this.userService.create(user).then(() => {
        // Sikeres regisztráció után Snackbar üzenet megjelenítése
        this.snackBar.open('Registration successful!', '', {
          duration: 5000,  // Az üzenet 5 másodpercig jelenik meg
          panelClass: ['success-snackbar']  // Szín testreszabása
        });

        // Felhasználó átirányítása a főoldalra
        this.router.navigate(['/']).then(() => {
          console.log('Registration successful');
        });

      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
  }
}
