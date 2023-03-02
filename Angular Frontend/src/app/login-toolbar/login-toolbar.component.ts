import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-toolbar',
  templateUrl: './login-toolbar.component.html',
  styleUrls: ['./login-toolbar.component.css']
})
export class LoginToolbarComponent {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['login'])
  }

  goToLanding() {
    this.router.navigate([''])
  }
}
