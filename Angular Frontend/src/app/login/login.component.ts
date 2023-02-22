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

  }

  ngOnInit(): void {
    this.loginPageStateService.onLoginPage$.subscribe((value: boolean) => {
      this.onLoginPage = value
    })
  }


  register(): void {


    //instead of having a disabled button, do some sort of check here to make sure each field is properly filled out
    //for each invalid input of register, show an invalid thing underneath like pic
    //when get past this and actually a register error or login error w server, you can show a banner at the top like pic
    
    //Also display a (registering...) html thing while it loads here



    //post user info to the backend and provide them w these 4 data variables as an object
    //see if you can make an named object first and a seperate function to clean it up
    this.httpClient
    .post<Response>('http://localhost:8080/register', {

      firstName: this.registerFirstName,
      lastName: this.registerLastName,
      email: this.registerEmail,
      password: this.registerPassword,

    })
    .subscribe((response: Response) => {
      
      console.log(response) 

      if(response.isSuccess){

        console.log('Success')

        //do stuff with authguard and jwt to ensure security
        localStorage.setItem('token', response.jwt)
        this.router.navigate(['home'])
        
      }else{
        console.log('not Success')
        //ngIf error html thing
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

      if(response != null){
        localStorage.setItem('token', response.jwt)
        // this.router.navigate(['home'])

        console.log('Success!!!')
      }else{
        console.log('Not a success')
      }

      //when the response is invalid and it throws an error, we cant go into the else statement,
      //so we need some sort of response when there is an error so we can properly do an else condition.
      //it has to do with the any typing... itd be ideal if we can already set a type for the response in case of error and failure
      
      
    

      this.loginEmail = null
      this.loginPassword = null
    })
  }
}