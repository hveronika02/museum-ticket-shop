import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedInUser?: firebase.default.User | null;
  showProfileMenu: boolean = false;
  routerSubscription: Subscription = new Subscription();
  isAdmin: boolean = false;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);
      this.loggedInUser = user;
      if (user && user.email === 'admin@gmail.com') {
        this.isAdmin = true;
      }
    }, error => {
      console.error(error);
    });
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showProfileMenu = false;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }


  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }
  logout(): void {
    this.authService.logout()
      .then(() => {
        localStorage.setItem('user', JSON.stringify('null'))
        console.log('Logged out succesfully.');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
