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

  user: {
    id : string | null, 
    name : string | null
  }

  headlineInputs: {
    search : string | null
    sortBy : string 
    order : string 
  }
  
  constructor(private httpClient : HttpClient, private router : Router){

    this.user = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('usersName')
    }

    this.headlineInputs = {
      search: null,
      sortBy: 'date',
      order: 'ascending'
    }
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
