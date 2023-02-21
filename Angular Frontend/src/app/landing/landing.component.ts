import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageStateService } from '../../services/login-page-state.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private router: Router, private loginPageStateService: LoginPageStateService) { }

  ngOnInit(): void {

  }

  goToLogin() {
    this.loginPageStateService.setOnLoginPage(false); 
    this.router.navigate(['login'])
  }
}
