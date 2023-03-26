import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { setupTestingRouter } from '@angular/router/testing';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //TODO: make an object  -> user info
  userId : string | null 
  usersName : string | null 

  //TODO: make an object -> user headlineInputs
  search : string | null
  sortBy : string 
  order : string 


  constructor(private httpClient : HttpClient, private router : Router){

    this.userId = localStorage.getItem('userId')
    this.usersName = localStorage.getItem('usersName')
    this.search = null
    this.sortBy = 'date'
    this.order = 'ascending'
  }

  AddRecipe() {

    this.httpClient
    .post<Response>('http://localhost:8080/recipeCreate', {
     
      //sends body to backend
      test : 'test string'

    })
    .subscribe((response: Response) => {
      
      //handles what to do with backend response

    }, (err) =>{
      //if response from backend is an error
    })

  }

}
