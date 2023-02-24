import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface Response {
  isSuccess: boolean
  id: number
  jwt: string
  message: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string | null
  password: string | null

  loadingSpinner: boolean
  showErrorFlag: boolean

  errorMessage: string 
  DEFAULT_ERROR : string
  



  constructor(protected httpClient: HttpClient, protected router: Router){
    this.email = null
    this.password = null
    this.loadingSpinner = false
    this.showErrorFlag = false
    this.DEFAULT_ERROR = 'Username or Password is Incorrect! Please try again.'
    this.errorMessage = this.DEFAULT_ERROR
  }

  Submit(): void{
    this.loadingSpinner = true
  
    //Verify All Fields Entered
    if(!this.email || !this.password){
      this.errorMessage = 'Please enter a value for all required fields. Please try again.'
      this.showErrorFlag = true
      this.loadingSpinner = false
      return;
    }


    this.httpClient
    .post<Response>('http://localhost:8080/login', {
      email: this.email,
      password: this.password

    })
    .subscribe((response: Response) => {

      this.loadingSpinner = false

      if(response.isSuccess){
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['home'])
      }else{
        this.showErrorFlag = true
      }

      this.email = null
      this.password = null
    })
  }


  
  GoTo(): void{
    this.router.navigate(['register'])
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
