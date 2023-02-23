import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageStateService } from '../../services/login-page-state.service';

@Component({
  selector: 'app-login-toolbar',
  templateUrl: './login-toolbar.component.html',
  styleUrls: ['./login-toolbar.component.css']
})
export class LoginToolbarComponent {
  constructor(private router: Router, private loginPageStateService: LoginPageStateService) { }

  goToLogin() {
    this.loginPageStateService.setOnLoginPage(true);  
    this.router.navigate(['login'])
  }

  goToLanding() {
    this.router.navigate([''])
  }
}
