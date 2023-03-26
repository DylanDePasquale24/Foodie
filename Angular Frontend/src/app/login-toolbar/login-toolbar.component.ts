import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service'; 

@Component({
  selector: 'app-login-toolbar',
  templateUrl: './login-toolbar.component.html',
  styleUrls: ['./login-toolbar.component.css']
})
export class LoginToolbarComponent {
  constructor(private router: Router, private authService : AuthService) { }

  goToLogin() {
    if(this.authService.IsLoggedIn()){
      this.router.navigate(['home'])
    }else{
      this.router.navigate(['login'])
    }
  }

  goToLanding() {
    this.router.navigate([''])
  }
}
