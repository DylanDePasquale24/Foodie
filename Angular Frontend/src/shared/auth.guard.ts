import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: "root",
})

export class AuthGuard implements CanActivate {

  //inject auth-service and router service
  constructor(private auth : AuthService, private router : Router) {}

  canActivate() {

    if(this.auth.IsLoggedIn()){
      return true
    }

    alert("You do not have permission to access this page. Please login first.")
    this.router.navigate(['login'])
    return false
  }

}