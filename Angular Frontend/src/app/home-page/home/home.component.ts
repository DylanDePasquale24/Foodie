import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'  //service
import { AddRecipeDialogComponent } from '../add-recipe-dialog/add-recipe-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: {
    id : string | null, 
    name : string | null
  }
  headlineInputs: {
    search : string | null,
    sortBy : string,
    order : string 
  }
  dialogConfig: {
    minWidth : string,
    maxHeight : string,
    maxWidth : string,
    data : {userID: string | null}
  }
  
  constructor(private dialogService: MatDialog){

    this.user = {
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('usersName')
    }
    this.headlineInputs = {
      search: null,
      sortBy: 'date',
      order: 'ascending'
    }
    this.dialogConfig = {
      minWidth: "800px",
      maxHeight: "800px",
      maxWidth: "800px",
      data: { userID: this.user.id} 
    }
  }

  OpenDialog(){

    let dialogReference = this.dialogService.open(AddRecipeDialogComponent, this.dialogConfig)  //takes a component and configuration as parameters
  
    dialogReference.afterClosed().subscribe(result => {
      
      //result after closed... as a string... can take this string and do whatever we want
      console.log(result)
    })
  }
}
