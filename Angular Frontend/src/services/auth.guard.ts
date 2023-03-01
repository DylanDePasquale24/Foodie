import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {

    //Get Request to backend to see if we are authorized?
    this.httpClient.get('http://localhost:8080/user-session')
    .subscribe((res) => {
        console.log(res, 'AuthGuard')

        //account for error
    })

    //Checks if token is in localStorage
    if(localStorage.getItem('token')){
        return true
    }else{
        return false
    }
    
  }

}