import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'  //service
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { ViewRecipeDialogComponent } from '../view-recipe-dialog/view-recipe-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


interface Macros {
  Calories : string
  Carbs : string
  Protein : string
  Fat : string
}
interface recipeFromBE {
  Description : string
  Ingredients : Array<string>
  Instructions : string
  RecipeID : number
  RecipeName : string
  UserID : number
  Date : string
  Macros: Array<Macros>
}

//make our own frontend recipe object here

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
    id: number | null,
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

  recipes : Array<recipeFromBE>
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

    // .get<Array<recipeFromBE>>('http://localhost:8080/recipeGet/' + this.user.id)
    // .subscribe((recipeListResponse : Array<recipeFromBE>) => {

    this.httpClient
    .get('http://localhost:8080/recipeGet/' + this.user.id)
    .subscribe((response : any) => {

      console.log(response)
      this.isDisplayingRecipes = true
      // this.recipes = recipeListResponse

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


    this.httpClient
    .get('http://localhost:8080/recipeGet/' + this.user.id)

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

      // console.log(name)
      // console.log(amt)


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

    // let config : viewRecipeDialogconfig = {
    //   minWidth: "850px",
    //   maxHeight: "800px",
    //   maxWidth: "800px",
    //   minHeight: "600px",
    //   data: {
    //     name: recipe.RecipeName,
    //     id: recipe.RecipeID,
    //     description: recipe.Description, 
    //     instructions: recipe.Instructions,
    //     date: recipe.Date,         
       
    //     ingredients: [...ingredientsArr], 
    //     totalMacros: {calories: 0, protein: 0, carbs: 0, fat: 0},         //RECIPE.MACROS
    //   }
    // }

    //let dialogRef = this.dialogService.open(ViewRecipeDialogComponent, config)
    
    // dialogRef.afterClosed().subscribe(deletedRecipe =>{
    //   if(deletedRecipe == "true"){
        
    //     //delete from array
    //     this.recipes.splice(recipeIndex, 1)  
    //   }

    //   //if false, do nothing
    // })
    
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

  DeleteRecipe(recipeId: number){

  }
}

