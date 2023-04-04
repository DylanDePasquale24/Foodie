import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


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

  val: boolean = false

  addedFirstIngredient : boolean

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) private passedInData: any){
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

    this.httpClient
    .post('http://localhost:8080/recipeCreate', {
      
      UserID: this.passedInData.userID,
      RecipeName: this.recipe.name,
      Description: this.recipe.description,
      Ingredients: this.recipe.ingredients,
      Instructions: this.recipe.instructions
    })
    .subscribe((response: any) => {
      
      //What to do if success
      //responds with recipeID



      console.log(response)
      //send success snack bar and close?



    }, (err) =>{

      //What to do if error
      console.log(err)


      //send failure snack bar and close
    })

  }
}
