import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  
  IsLoggedIn() : boolean{
    
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }
}
