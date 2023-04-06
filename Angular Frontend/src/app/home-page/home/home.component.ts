import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'  //service
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { HttpClient } from '@angular/common/http';
import { uniq } from 'cypress/types/lodash';


interface Macros {
  calories : number
  carbs : number
  protein : number
  fat : number
}
interface Recipe {
  name : string
  description : string
  ingredients : Array<string>
  ingredientMacros : Array<Macros>   //index corresponds to index of the ingredients array
  instructions : string

  //totalMacros : Macros   //for the entire recipe
}
/*COULD HAVE A RESPONSE RECIPE AND A FRONTEND RECIPE TOO (SEPERATE) */

//could also do a pair -> ingredients : Array<string, Macros>  
  //can backend do?

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: {
    id : string | null, 
    name : string | null,
    lastName: string | null,
    email : string | null
  }
  headlineInputs: {
    search : string | null,
    sortBy : string,
    order : string 
  }
  dialogConfig: {
    minWidth : string,
    maxHeight : string,
    maxWidth : string,
    data : {userID: string | null}
  }

  //Array stores all of recipes
  recipes : Array<Recipe>
  
  constructor(private httpClient: HttpClient,private dialogService: MatDialog){

    this.user = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('usersName'),
      lastName: localStorage.getItem('usersLName'),
      email: localStorage.getItem('usersEmail')
    }
    this.headlineInputs = {
      search: null,
      sortBy: 'date',
      order: 'ascending'
    }
    this.dialogConfig = {
      minWidth: "800px",
      maxHeight: "800px",
      maxWidth: "800px",
      data: { userID: this.user.id} 
    }

    this.recipes = []  //for now... may need to populate it with the GetRecipes() function somehow

    //in the constructor do a call to the http to fetch recipes and store in the recipes array
    //or maybe theres a way to constantly refresh... (websocket i think?)
    //or cud just do in constructor, and everytime the user adds a new recipe
  }

  OpenDialog(){

    let dialogReference = this.dialogService.open(AddRecipeDialogComponent, this.dialogConfig)  //takes a component and configuration as parameters
  
    dialogReference.afterClosed().subscribe(result => {
      
      //result after closed... as a string... can take this string and do whatever we want
      console.log(result)
    })
  }
  GetRecipes(){

    this.httpClient
    .get<Array<Recipe>>('/recipeGet/' + this.user.id)
    .subscribe((recipeListResponse : Array<Recipe>) => {

      //What to do with response 

    }, (err) =>{

      //What to do when theres an error
    })

  }
}

