import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'  //service
import { ProfileDialogComponent } from '../home-page/profile-dialog/profile-dialog.component';
import { AddRecipeDialogComponent } from '../home-page/add-recipe-dialog/add-recipe-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {


  profileDialogConfig: {
    minWidth : string,
    maxHeight : string,
    maxWidth : string
  }

  addRecipeDialogConfig: {
    minWidth : string,
    maxHeight : string,
    maxWidth : string
  }

  constructor(private router: Router, private dialogService: MatDialog) { 

    this.profileDialogConfig = {
      minWidth: "500px",
      maxHeight: "800px",
      maxWidth: "800px"
    }
    this.addRecipeDialogConfig = {
      minWidth: "800px",
      maxHeight: "800px",
      maxWidth: "800px"
    }

  }

  LogOut() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  DisplayProfile() {

    let dialogReference = this.dialogService.open(ProfileDialogComponent, this.profileDialogConfig)  //takes a component and configuration as parameters
  
    dialogReference.afterClosed().subscribe(result => {
      
      //result after closed... as a string... can take this string and do whatever we want
      console.log(result)
    })

  }

  CreateRecipe() {
    this.dialogService.open(AddRecipeDialogComponent, this.addRecipeDialogConfig)
  }

}
