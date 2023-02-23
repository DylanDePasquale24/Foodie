import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPageStateService } from '../../services/login-page-state.service';

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
  onLoginPage: boolean;

  registerFirstName: string | null
  registerLastName: string | null 
  registerEmail: string | null 
  registerPassword: string | null

  loginEmail: string | null
  loginPassword: string | null


  registerSpinner: boolean
  loginSpinner: boolean
  hasBackendError: boolean

  

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private loginPageStateService: LoginPageStateService
  ){
    this.onLoginPage = false
    this.registerFirstName = null
    this.registerLastName = null
    this.registerEmail = null
    this.registerPassword = null
    this.loginEmail = null
    this.loginPassword = null

    this.registerSpinner = false
    this.loginSpinner = false
    this.hasBackendError = false
  }

  ngOnInit(): void {
    this.loginPageStateService.onLoginPage$.subscribe((value: boolean) => {
      this.onLoginPage = value
    })
  }


  register(): void {

    this.registerSpinner = true;

    //instead of having a disabled button, do some sort of check here to make sure each field is properly filled out
    //for each invalid input of register, show an invalid thing underneath like pic
    //when get past this and actually a register error or login error w server, you can show a banner at the top like pic
    //WHEN RETURN AFTER THESE, SET ISREGISTERING BACK TO FALSE

    



    //post user info to the backend and provide them w these 4 data variables as an object
    this.httpClient
    .post<Response>('http://localhost:8080/register', {

      firstName: this.registerFirstName,
      lastName: this.registerLastName,
      email: this.registerEmail,
      password: this.registerPassword,

    })
    .subscribe((response: Response) => {
      
      this.registerSpinner = false
      if(response.isSuccess){
      
        //do stuff with authguard and jwt to ensure security
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['home'])
      }else{
        this.hasBackendError = true
      }

      this.registerFirstName = null
      this.registerLastName = null
      this.registerEmail = null
      this.registerPassword = null
    })

  }

  login(): void{

    this.loginSpinner = true
  
    this.httpClient
    .post('http://localhost:8080/login', {

      email: this.loginEmail,
      password: this.loginPassword

    })
    .subscribe((response: any) => {

      this.loginSpinner = false

      if(response.isSuccess){
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['home'])
      }else{
        this.hasBackendError = true
      }

      this.loginEmail = null
      this.loginPassword = null
    })
  }

  goToLogin(): void{
    this.onLoginPage = true
    this.hasBackendError = false
  }
  goToRegister(): void{
    this.onLoginPage = false
    this.hasBackendError = false
  }
}