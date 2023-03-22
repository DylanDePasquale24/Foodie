import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  IsLoggedIn(){


    //Get Request to backend to see if we are authorized?
    // this.httpClient.get('http://localhost:8080/user-session')
    // .subscribe((res) => {
    //     console.log(res, 'AuthGuard')

    //     //account for error
    // })


    //checks if a token was set in localStorage (from the login or register submission)
    if(localStorage.getItem('token')){
      return true;
    }else {
      return false;
    }
  }
}
