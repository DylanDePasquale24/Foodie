import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface Response {

  isSuccess: boolean
  id: number
  jwt: string
  message: string
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})


export class RegisterComponent extends LoginComponent {
  
  firstName: string | null
  lastName: string | null

  constructor (httpClient: HttpClient, router: Router){
    super(httpClient, router);
    this.firstName = null
    this.lastName = null
    this.DEFAULT_ERROR = 'We could not register that account! Please try again.'
    this.errorMessage = this.DEFAULT_ERROR
  }

  override Submit(): void {
    this.loadingSpinner = true;

    //Verify All Fields Entered
    if(!this.firstName || !this.lastName || !this.email || !this.password){
      this.errorMessage = 'Please enter a value for all required fields. Please try again.'
      this.showErrorFlag = true
      this.loadingSpinner = false
      return;
    }

    //Verify Password
    if(this.password.length < 8){
      this.errorMessage = 'Your password must be a minimum of 8 characters! Please try again.'
      this.showErrorFlag = true
      this.loadingSpinner = false
      return;
    }
    
    //Verify Email
    if(!this.isValidEmail(this.email)){
      this.errorMessage = 'Please enter a valid email!'
      this.showErrorFlag = true
      this.loadingSpinner = false
      return;
    }
    
  
  
  
    //post user info to the backend and provide them w these 4 data variables as an object
    this.httpClient
    .post<Response>('http://localhost:8080/register', {
  
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
  
    })
    .subscribe((response: Response) => {
      
      this.loadingSpinner = false

      if(response.isSuccess){
        //do stuff with authguard and jwt to ensure security
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['home'])

      }else{
        this.showErrorFlag = true
      }
  
      this.firstName = null
      this.lastName = null
      this.email = null
      this.password = null
    })
  }


  
  override GoTo(): void {
    this.router.navigate(['login'])
  }
}
