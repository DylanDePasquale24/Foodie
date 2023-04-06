import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


interface Response {
  id : string
  usersFName: string
  usersLName: string
  jwt: string
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
      
      console.log(response)
      this.loadingSpinner = false
      this.router.navigate(['home'])
      
      //Local Storage
      localStorage.setItem('token', response.jwt)
      localStorage.setItem('userId', response.id)
      localStorage.setItem('usersFName', response.usersFName)
      localStorage.setItem('usersLName', response.usersLName)

      if (this.email !== undefined && this.email !== null) {
        localStorage.setItem('usersEmail', this.email);
      }
  
      this.email = null
      this.password = null

    }, (err) =>{

      this.loadingSpinner = false
      this.showErrorFlag = true
      this.errorMessage = this.DEFAULT_ERROR

      this.email = null
      this.password = null

      //debug info
      console.log(err)
    })
  }


  
  GoTo(): void{
    this.router.navigate(['register'])
  }
}
