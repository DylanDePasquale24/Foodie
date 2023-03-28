import { Component } from '@angular/core';

@Component({
  selector: 'app-add-recipe-dialog',
  templateUrl: './add-recipe-dialog.component.html',
  styleUrls: ['./add-recipe-dialog.component.css']
})
export class AddRecipeDialogComponent {

  //TODO: change ingredients to an array/object
  recipe : {
    name: string | null,
    description: string | null,
    ingredients: string | null,
    instructions: string | null
  }

  constructor(){
    this.recipe = {
      name: null,
      description: null,
      ingredients: null,
      instructions: null
    }
  }

  //Function
}
