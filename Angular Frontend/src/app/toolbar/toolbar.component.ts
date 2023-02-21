import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageStateService } from '../login-page-state.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private router: Router, private loginPageStateService: LoginPageStateService) { }

  goToLogin() {
    this.loginPageStateService.setOnLoginPage(true);  
    this.router.navigate(['login'])
  }

}
