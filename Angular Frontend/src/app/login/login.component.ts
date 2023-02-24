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
  hasBackendError: boolean



  constructor(protected httpClient: HttpClient, protected router: Router){
    this.email = null
    this.password = null
    this.loadingSpinner = false
    this.hasBackendError = false
  }

  Submit(): void{

    this.loadingSpinner = true
  
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
        this.hasBackendError = true
      }

      this.email = null
      this.password = null
    })
  }


  
  GoTo(): void{
    this.router.navigate(['register'])
  }
}




// register(): void {

//   this.loadingSpinner = true;

//   //instead of having a disabled button, do some sort of check here to make sure each field is properly filled out
//   //for each invalid input of register, show an invalid thing underneath like pic
//   //when get past this and actually a register error or login error w server, you can show a banner at the top like pic
//   //WHEN RETURN AFTER THESE, SET ISREGISTERING BACK TO FALSE


//   if (this.registerFirstName)
  



//   //post user info to the backend and provide them w these 4 data variables as an object
//   this.httpClient
//   .post<Response>('http://localhost:8080/register', {

//     firstName: this.registerFirstName,
//     lastName: this.registerLastName,
//     email: this.registerEmail,
//     password: this.registerPassword,

//   })
//   .subscribe((response: Response) => {
    
//     this.registerSpinner = false
//     if(response.isSuccess){
    
//       //do stuff with authguard and jwt to ensure security
//       localStorage.setItem('token', response.jwt)
//       this.router.navigate(['home'])
//     }else{
//       this.hasBackendError = true
//     }

//     this.registerFirstName = null
//     this.registerLastName = null
//     this.registerEmail = null
//     this.registerPassword = null
//   })
// }



// goToLogin(): void{
//   this.onLoginPage = true
//   this.hasBackendError = false
// }