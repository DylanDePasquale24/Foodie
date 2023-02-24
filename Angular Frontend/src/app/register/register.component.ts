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
  }

  override Submit(): void {
    this.loadingSpinner = true;

    //instead of having a disabled button, do some sort of check here to make sure each field is properly filled out
    //for each invalid input of register, show an invalid thing underneath like pic
    //when get past this and actually a register error or login error w server, you can show a banner at the top like pic
    //WHEN RETURN AFTER THESE, SET ISREGISTERING BACK TO FALSE
  
    
  
  
  
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
        this.hasBackendError = true
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
