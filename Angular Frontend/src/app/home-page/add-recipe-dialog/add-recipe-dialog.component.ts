import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css'],
})
export class AddRecipeDialogComponent {

  recipe : {
    name: string | null,
    description: string | null,
    ingredients: Array<string>,   //store as "ingredient | amnt"
    instructions: string | null
  }
  temp : {
    ingredient: any,
    amount : any
  }

  addedFirstIngredient : boolean
  savingSpinner : boolean
  test = new Date()

  constructor(private httpClient: HttpClient, private dialogRef: MatDialogRef<AddRecipeDialogComponent>, private snackBar: MatSnackBar){
    this.recipe = {
      name: null,
      description: null,
      ingredients: [],
      instructions: null
    }
    this.temp = {
      ingredient: null,
      amount: null
    }
    this.addedFirstIngredient = false
    this.savingSpinner = false
  }

  AddIngredient(): void{

    //Empty Inputs
    if(this.temp.ingredient == null || this.temp.amount == null){
      return
    }

    //Amount != Number
    if(!(!(this.temp.amount instanceof Array) && (this.temp.amount - parseFloat(this.temp.amount) + 1) >= 0)){
      return
    }

    //Combine w delimiter
    let combineIngredientAndAmt: string = this.temp.ingredient + " " + '| ' + this.temp.amount
    this.recipe.ingredients.push(combineIngredientAndAmt)
  
    //reset form
    this.temp.ingredient = null
    this.temp.amount = null
    this.addedFirstIngredient = true;
  }
  DeletePrevIngredient(): void{
    this.recipe.ingredients.pop()
  }
  SendRecipeToBackend(): void{

    this.savingSpinner = true

    let date = new Date()
    console.log(date)

    this.httpClient
    .post('http://localhost:8080/recipeCreate', {
      
      UserID: localStorage.getItem('userId'),
      RecipeName: this.recipe.name,
      Description: this.recipe.description,
      Ingredients: this.recipe.ingredients,
      Instructions: this.recipe.instructions
    })
    .subscribe((response: any) => {
      
      //What to do if success
      
      console.log(response)
      this.savingSpinner = false
      this.dialogRef.close()

      //snack bar
      this.snackBar.open("Recipe created successfully! (Refresh to Update)", "Dismiss")
      
    }, (err) =>{

      //What to do if error
      console.log(err)
      this.savingSpinner = false

      //Snack bar
      this.snackBar.open("Recipe could NOT be created!", "Dismiss")
    })

  }
}


