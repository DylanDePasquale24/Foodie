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

interface Ingredient {
  name: string,
  amount: number,
  calories: number,
  protein: number,
  carbs: number, 
  fat: number
}
interface viewRecipeDialogconfig {
  minWidth : string,
  maxHeight : string,
  maxWidth : string, 
  minHeight: string,

  data : {
    name: string | null,
    description: string | null,
    instructions: string | null,
    date: string, 

    ingredients: Array<Ingredient>,  
    totalMacros: Macros
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

    this.recipes = [] 
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

    let ingredientsArr : Array<Ingredient> = []
    for(let i = 0; i < recipe.Ingredients.length; i++){
      //go through the ingredients and also check the macros


      //string "chicken | 150"  -> need to seperate out delimeter for name & amt
      let ingredString : string = recipe.Ingredients[i]
      let name: string = ingredString.substring(0,ingredString.indexOf("|"))
      let amt: number = Number(ingredString.split('|')[1])

      console.log(name)
      console.log(amt)


      //Populate ingredient
      let ingredient = {} as Ingredient
      ingredient.name = name
      ingredient.amount = amt
      // ingredient.calories = recipe.ingredientMacros[i].calories
      // ingredient.carbs = recipe.ingredientMacros[i]. carbs
      // ingredient.fat = recipe.ingredientMacrso[i].fat
      // ingredient.protein = recipe.ingredientMacros[i].protein

      ingredientsArr.push(ingredient)
    }

    let config : viewRecipeDialogconfig = {
      minWidth: "850px",
      maxHeight: "800px",
      maxWidth: "800px",
      minHeight: "600px",
      data: {
        name: recipe.RecipeName,
        description: recipe.Description, 
        instructions: recipe.Instructions,
        date: recipe.Date,         
       
        ingredients: [...ingredientsArr], 
        totalMacros: {calories: 0, protein: 0, carbs: 0, fat: 0},         //RECIPE.MACROS
      }
    }

    this.dialogService.open(ViewRecipeDialogComponent, config)
    //when delete this recipe, can make use of mat dialog close
  }
  
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

