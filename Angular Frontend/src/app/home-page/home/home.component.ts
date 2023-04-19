import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'  //service
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';
import { ViewRecipeDialogComponent } from '../view-recipe-dialog/view-recipe-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


/* FROM BACKEND */
interface recipeFromBE {
  Description : string
  Ingredients : Array<string>
  Instructions : string
  RecipeID : number
  RecipeName : string
  UserID : number
  Date : string
  MacroInformation: Array<Macros>  //last element is total macros
}
interface Macros {
  Calories : string
  Carbs : string
  Protein : string
  Fat : string
}

/*FRONTEND USE ONLY */
interface Ingredient {
  name: string,
  amount: number,
  calories: string,
  protein: string,
  carbs: string, 
  fat: string
}
interface ViewRecipeDialogConfig {
  minWidth : string,
  maxHeight : string,
  maxWidth : string, 
  minHeight: string,
  data : {

    //Recipe Info
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

  recipesList : Array<recipeFromBE>
  isDisplayingRecipes : boolean
  hasNoRecipes : boolean
  noRecipeMessg : string

  // ------------------------------------------------------------------------------
  // CREATE A TEMPORARY LIST OF RECIPES TO TEST THE SEARCH AND SORT FUNCTIONALITY

  mockRecipe1: recipeFromBE = {
    Description: "Sushi rolls with rice, salmon, and avocado",
    Ingredients: ["rice", "salmon", "avocado"],
    Instructions:
      "Cut up the salmon and avocado. Roll the rice, salmon, and avocado into a sushi roll. Enjoy!",
    RecipeID: 56,
    RecipeName: "Sushi",
    UserID: 6,
    Date: "2023-04-18",
    MacroInformation: [
      {
        Calories: "400",
        Carbs: "50g",
        Protein: "20g",
        Fat: "15g",
      },
    ],
  };

  mockRecipe2: recipeFromBE = {
    Description: "A classic BLT",
    Ingredients: ["bacon", "lettuce", "tomato", "bread"],
    Instructions:
      "Assemble the BLT. Enjoy!",
    RecipeID: 20,
    RecipeName: "BLT",
    UserID: 6,
    Date: "2023-09-12",
    MacroInformation: [
      {
        Calories: "900",
        Carbs: "20g",
        Protein: "30g",
        Fat: "20g",
      },
    ],
  };

  mockRecipe3: recipeFromBE = {
    Description: "Homemade Cheese Pizza",
    Ingredients: ["cheese", "sauce", "dough"],
    Instructions:
      "Assemble the pizza. Enjoy!",
    RecipeID: 34,
    RecipeName: "Cheese Pizza",
    UserID: 6,
    Date: "2019-09-12",
    MacroInformation: [
      {
        Calories: "2000",
        Carbs: "70g",
        Protein: "30g",
        Fat: "40g",
      },
    ],
  };


  // ------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------

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

    this.recipesList = [] 
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
    .get<Array<recipeFromBE>>('http://localhost:8080/recipeGet/' + this.user.id)
    .subscribe((recipeListResponse : Array<recipeFromBE>) => {

      console.log(recipeListResponse)
      this.isDisplayingRecipes = true
      this.recipesList = recipeListResponse

      // Update the options array here, for autocomplete
      this.autocompleteOptions = this.recipesList.map(recipe => recipe.RecipeName);
      this.filteredOptions = this.searchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

    }, (err) =>{

      //What to do when theres an error
      this.hasNoRecipes = true
      this.noRecipeMessg = "You don't have any recipes yet. Add a recipe to get started!"
    })
  }

  ViewRecipeDialog(recipeIndex: number){

    let recipe: recipeFromBE = this.recipesList[recipeIndex]

    //Making better formated ingredients format to send to dialog in config
    let ingredientsArr : Array<Ingredient> = []
    for(let i = 0; i < recipe.Ingredients.length; i++){

      //string "chicken | 150"  -> need to seperate out delimeter for name & amt
      let ingredString : string = recipe.Ingredients[i]
      let name: string = ingredString.substring(0,ingredString.indexOf("|"))
      let amt: number = Number(ingredString.split('|')[1])

      //Populate ingredient
      let ingredient = {} as Ingredient
      ingredient.name = name
      ingredient.amount = amt
      ingredient.calories = recipe.MacroInformation[i].Calories
      ingredient.carbs = recipe.MacroInformation[i]. Carbs
      ingredient.fat = recipe.MacroInformation[i].Fat
      ingredient.protein = recipe.MacroInformation[i].Protein

      ingredientsArr.push(ingredient)
    }

    let config :  ViewRecipeDialogConfig = {
      minWidth: "850px",
      maxHeight: "800px",
      maxWidth: "800px",
      minHeight: "600px",
      data: {
        name: recipe.RecipeName,
        id: recipe.RecipeID,
        description: recipe.Description, 
        instructions: recipe.Instructions,
        date: recipe.Date,         
       
        ingredients: [...ingredientsArr], 

        //last element of MacroInformation is totalMacros
        totalMacros: recipe.MacroInformation[recipe.MacroInformation.length - 1],    
      }
    }

    let dialogRef = this.dialogService.open(ViewRecipeDialogComponent, config)
    
    dialogRef.afterClosed().subscribe(deletedRecipe =>{
      if(deletedRecipe == "true"){
        
        //delete from array
        this.recipesList.splice(recipeIndex, 1)  
      }

      //if false, do nothing
    })
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

