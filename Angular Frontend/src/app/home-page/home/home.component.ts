import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'  //service
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
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

  //ingredientMacros : Array<Macros>   //index corresponds to index of the ingredients array
  //totalMacros : Macros   //calories, protein, carbs, fat for entire recipe - adding up all ingredient macros
  //dateCreated : string

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
  dialogConfig: {
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
    this.dialogConfig = {
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

  OpenDialog(){
    this.dialogService.open(AddRecipeDialogComponent, this.dialogConfig)  //takes a component and configuration as parameters
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

