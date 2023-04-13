import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-recipe-dialog',
  templateUrl: './view-recipe-dialog.component.html',
  styleUrls: ['./view-recipe-dialog.component.css']
})
export class ViewRecipeDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public recipe : any){
    // console.log(data.recipe.Ingredients)


    //the ingredients array is passed as a string, not an array
  }
}
