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
  hidden?: boolean
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
  }, 
  autoFocus: boolean
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

  // NEEDED FOR SORTING
  isAscending: boolean = true;

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
      ingredient.calories = this.Round(recipe.MacroInformation[i].Calories)
      ingredient.carbs = this.Round(recipe.MacroInformation[i]. Carbs)
      ingredient.fat = this.Round(recipe.MacroInformation[i].Fat)
      ingredient.protein = this.Round(recipe.MacroInformation[i].Protein)

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
      },
      autoFocus: false
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();

    this.recipesList.forEach(recipe => {
      if (recipe.RecipeName.toLowerCase().includes(filterValue)) {
        recipe.hidden = false;
      } else {
        recipe.hidden = true;
      }
    });

  }
  
  onSortByChange(newOrderSelection: string) {
    console.log(`New value: ${newOrderSelection}`);

    this.recipesList = this.recipesList.sort((a, b) => {

      switch(newOrderSelection){
        case 'date': {
          // What to do when there is no date??

          const dateA = new Date(a.Date);
          const dateB = new Date(b.Date);

          if(this.isAscending){
            return dateA.getTime() - dateB.getTime();
          } else {
            return dateB.getTime() - dateA.getTime();
          }
        }

        case 'calories': {
          const caloriesA = parseFloat(a.MacroInformation[a.MacroInformation.length - 1].Calories);
          const caloriesB = parseFloat(b.MacroInformation[b.MacroInformation.length - 1].Calories);
        
          if(this.isAscending){
            return caloriesA - caloriesB;
          } else {
            return caloriesB - caloriesA;
          }
        }

        case 'protein': {
          const proteinA = parseFloat(a.MacroInformation[a.MacroInformation.length - 1].Protein);
          const proteinB = parseFloat(b.MacroInformation[b.MacroInformation.length - 1].Protein);
        
          if(this.isAscending){
            return proteinA - proteinB;
          } else {
            return proteinB - proteinA;
          }
        }

        case 'carbs': {
          const carbsA = parseFloat(a.MacroInformation[a.MacroInformation.length - 1].Carbs);
          const carbsB = parseFloat(b.MacroInformation[b.MacroInformation.length - 1].Carbs);
        
          if(this.isAscending){
            return carbsA - carbsB;
          } else {
            return carbsB - carbsA;
          }
        }

        case 'fat': {
          const fatA = parseFloat(a.MacroInformation[a.MacroInformation.length - 1].Fat);
          const fatB = parseFloat(b.MacroInformation[b.MacroInformation.length - 1].Fat);
        
          if(this.isAscending){
            return fatA - fatB;
          } else {
            return fatB - fatA;
          }
        }

      }

      return 0;
    
    });

    // console.log(this.recipesList)
  }
  
  onOrderByChange(newValue: string) {
    console.log(`Sorting changed: ${newValue}`);

    if(newValue == 'ascending'){
      this.isAscending = true
      this.onSortByChange(this.headlineInputs.sortBy)
    } else {
      this.isAscending = false
      this.onSortByChange(this.headlineInputs.sortBy)
    }
  }

  RoundToNearest5(numStr: string): string{

    let num: number = Number(numStr)

    const remainder = num % 5; // Get the remainder when dividing by 5
    const halfOfInterval = 2.5; // Half of the 5 unit interval
  
    if (remainder < halfOfInterval) {
      // Round down to the nearest 5
      num = num - remainder;
    } else {
      // Round up to the nearest 5
      num = num + (5 - remainder);
    }

    return num.toString()
  }
  Round(numStr: string): string{
    return Math.round(Number(numStr)).toString()
  }
}

