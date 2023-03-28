import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'  //service
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';


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
    search : string | null,
    sortBy : string,
    order : string 
  }
  dialogConfig: {
    height : string,
    width : string
  }
  
  constructor(private httpClient : HttpClient, private router : Router, private dialogService: MatDialog){

    this.user = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('usersName')
    }
    this.headlineInputs = {
      search: null,
      sortBy: 'date',
      order: 'ascending'
    }
    this.dialogConfig = {
      height : "600px",
      width : "900px"
    }
  }

  OpenDialog(){
    let dialogReference = this.dialogService.open(AddRecipeDialogComponent, this.dialogConfig)  //takes a component and configuration as parameters
  

    dialogReference.afterClosed().subscribe(result => {
      
      //result after closed... as a string... can take this string and do whatever we want

      console.log(result)
    })
  }


  AddRecipe() {

    this.httpClient
    .post<Response>('http://localhost:8080/recipeCreate', {
     
      //sends body to backend
      userID : "30",
      recipeName : "Test Recipe Name 3",
      description : "Test description",
      ingredients : "Test ingredients",
      instructions : "Test instructions"

    })
    .subscribe((response: Response) => {
      
      //handles what to do with backend response

    }, (err) =>{
      //if response from backend is an error
    })

  }

}
