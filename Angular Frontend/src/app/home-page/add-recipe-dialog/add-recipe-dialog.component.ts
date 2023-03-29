import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css'],
  providers: [
    { 
      provide: STEPPER_GLOBAL_OPTIONS, 
      useValue: {showError: true}
    },
  ],
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
  completedRecipe : boolean

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder){
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
    this.completedRecipe = false
  }

  AddIngredient(): void{

    //TODO: VERIFY INGREDIENT WITH BACKEND BEFORE YOU ADD IT


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
    console.log("complete recipe function called")

    //if couldnt add recipe bc of an error like a field wasn't entered, then 
    //once complete recipe,, you can change the end from cancel to close (or just always have close and just add snackbar)
    
    

    //before you mark as completed, check if recipe.name != null and ingredients length is 1 or more
    //then have an ngIf directive to display on review screen
    




    //Send Recipe to Bakcend
    //if desc = null, set to something
    //if instructions = null, set to something
  }
}
