import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'  //service
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { ViewRecipeDialogComponent } from '../view-recipe-dialog/view-recipe-dialog.component';
import { HttpClient } from '@angular/common/http';
import { uniq } from 'cypress/types/lodash';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


interface Macros {
  calories : number
  carbs : number
  protein : number
  fat : number
}
interface dbRecipe {
  Description : string
  Ingredients : Array<string>
  Instructions : string
  RecipeID : number
  RecipeName : string
  UserID : number
  Date : string

  //ingredientMacros : Array<Macros>   //index corresponds to index of the ingredients array
  //totalMacros : Macros   //calories, protein, carbs, fat for entire recipe - adding up all ingredient macros

}
/*COULD HAVE A RESPONSE RECIPE AND A FRONTEND RECIPE TOO (SEPERATE) */

//could also do a pair -> ingredients : Array<string, Macros>  
  //can backend do?

interface viewRecipeDialogconfig {
  minWidth : string,
  maxHeight : string,
  maxWidth : string, 
  data : {
    name: string | null,
    description: string | null,
    ingredients: Array<string>,  
    instructions: string | null,

    dateCreated: string,  //change this data type?
    totalMacros: Macros,
    ingredientMacros: Array<Macros>
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  searchControl = new FormControl();
  filteredOptions: Observable<string[]> = new Observable();
  autocompleteOptions: string[] = [];

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
  addRecipeDialogConfig: {
    minWidth : string,
    maxHeight : string,
    maxWidth : string
  }

  
  recipes : Array<dbRecipe>
  isDisplayingRecipes : boolean
  hasNoRecipes : boolean
  noRecipeMessg : string

  
  constructor(private httpClient: HttpClient,private dialogService: MatDialog){

    this.user = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('usersFName'),
      lastName: localStorage.getItem('usersLName'),
      email: localStorage.getItem('usersEmail')
    }
    this.headlineInputs = {
      search: null,
      sortBy: 'date',
      order: 'ascending'
    }
    this.addRecipeDialogConfig = {
      minWidth: "800px",
      maxHeight: "800px",
      maxWidth: "800px"
    }

    this.recipes = []  //for now... may need to populate it with the GetRecipes() function somehow
    this.isDisplayingRecipes = false
    this.hasNoRecipes = false
    this.noRecipeMessg = "Fetching Saved Recipes..."
    
    this.GetRecipes()
  }

  // Needed for autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autocompleteOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  AddRecipeDialog(){
    this.dialogService.open(AddRecipeDialogComponent, this.addRecipeDialogConfig)  //takes a component and configuration as parameters
  }
  GetRecipes(){

    this.httpClient
    .get<Array<dbRecipe>>('http://localhost:8080/recipeGet/' + this.user.id)
    .subscribe((recipeListResponse : Array<dbRecipe>) => {

      console.log(recipeListResponse)
      this.isDisplayingRecipes = true
      this.recipes = recipeListResponse

      // Update the options array here, for autocomplete
      this.autocompleteOptions = this.recipes.map(recipe => recipe.RecipeName);
      this.filteredOptions = this.searchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    }, (err) =>{

      //What to do when theres an error
      this.hasNoRecipes = true
      this.noRecipeMessg = "You don't have any recipes yet. Add a recipe to get started!"
      
      //if time -> add custom mssg 
    })

  }
  ViewRecipeDialog(recipeIndex: number){

    let recipe = this.recipes[recipeIndex]

    let config : viewRecipeDialogconfig = {
      minWidth: "800px",
      maxHeight: "800px",
      maxWidth: "800px",
      data: {
        name: recipe.RecipeName,
        description: recipe.Description,
        ingredients: Object.assign({}, recipe.Ingredients),  
        instructions: recipe.Instructions,

        dateCreated: "CHANGE-DATE-CREATED",                               //change this data type?  //RECIPE.DATE
        totalMacros: {calories: 0, protein: 0, carbs: 0, fat: 0},         //RECIPE.MACROS
        ingredientMacros: [{calories: 0, protein: 0, carbs: 0, fat: 0}]   //RECIPE.INGREDIENTMACROS
      }
    }

   
    
    this.dialogService.open(ViewRecipeDialogComponent, config)
    //when delete this recipe, can make use of mat dialog close
  }
  
  // Sort Recipes function, can sort based on whichever criteria is passed in
  SortRecipes(criteria: string){
    
    criteria = criteria.toUpperCase()

    switch(criteria)
    {
      case 'DATE':
        // sort by date
        break;
      case 'CALORIES':
        // sort by calories
        break;
      case 'PROTEIN':
        // sort by protein
        break;
      case 'CARBS':
        // sort by carbs
        break;
      case 'FAT':
        // sort by fat
        break;
      default:
        // sort by date
        break;
    }

  }
}

