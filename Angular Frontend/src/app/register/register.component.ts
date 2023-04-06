import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';



interface Response {
  id: string
  usersFName: string
  usersLName: string
  jwt: string
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
    this.DEFAULT_ERROR = 'We could not register your account! Please try again.'
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

    //Verify Email
    if(!this.isValidEmail(this.email)){
      this.errorMessage = 'Please enter a valid email!'
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
    
    //post user info to the backend and provide them w these 4 data variables as an object
    this.httpClient
    .post<Response>('http://localhost:8080/register', {
  
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    })
    .subscribe((response: Response) => {
      
      console.log(response)
      this.loadingSpinner = false
      this.router.navigate(['home'])

      //Store local storage
      localStorage.setItem('token', response.jwt)
      localStorage.setItem('userId', response.id)
      localStorage.setItem('usersFName', response.usersFName)
      localStorage.setItem('usersLName', response.usersLName)

      if (this.email !== undefined && this.email !== null) {
        localStorage.setItem('usersEmail', this.email);
      }


      this.firstName = null
      this.lastName = null
      this.email = null
      this.password = null
    }, (err) => {
   
      this.loadingSpinner = false
      this.showErrorFlag = true
      this.errorMessage = this.DEFAULT_ERROR

      this.firstName = null
      this.lastName = null
      this.email = null
      this.password = null

      //debug info
      console.log(err) 
    })
  }

  override GoTo(): void {
    this.router.navigate(['login'])
  }

  isValidEmail(email : string): boolean{

    let isChar = (c: string): boolean => {
      return ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'));
    }
    
    if (!isChar(email.charAt(0))) {
      return false;
    }

    let atPos = -1;
    let dotPos = -1;
  
    for (let i = 0; i < email.length; i++) {
      if (email.charAt(i) === '@') {
        atPos = i;
      } else if (email.charAt(i) === '.') {
        dotPos = i;
      }
    }
  
    if (atPos === -1 || dotPos === -1 || atPos > dotPos || dotPos >= (email.length - 1)) {
      return false;
    }
  
    return true;
  }
}
