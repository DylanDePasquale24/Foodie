import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  onLoginPage: boolean 

  registerFirstName: string | null
  registerLastName: string | null 
  registerEmail: string | null 
  registerPassword: string | null

  loginEmail: string | null
  loginPassword: string | null

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ){
    this.onLoginPage = false
    this.registerFirstName = null
    this.registerLastName = null
    this.registerEmail = null
    this.registerPassword = null
    this.loginEmail = null
    this.loginPassword = null
  }

  register(): void {
    
    this.httpClient.post('http://localhost:8080/register', {
      firstName: this.registerFirstName,
      lastName: this.registerLastName,
      email: this.registerEmail,
      password: this.registerPassword,
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        // this.router.navigate(['home'])
      }
      this.registerFirstName = null
      this.registerLastName = null
      this.registerEmail = null
      this.registerPassword = null
    })
  }

  login(): void{
    this.httpClient.post('http://localhost:8080/login', {
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe((response: any) => {
      if(response){
        localStorage.setItem('token', response.jwt)
        // this.router.navigate(['home'])
      }
      this.loginEmail = null
      this.loginPassword = null
    })
  }
}