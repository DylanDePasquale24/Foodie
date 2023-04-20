import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent {
  userInfo: {
    firstName : string | null,
    lastName : string | null,
    email : string | null
  }

  constructor(private httpClient: HttpClient, @Inject(MAT_DIALOG_DATA) private passedInData: any, private dialogRef: MatDialogRef<ProfileDialogComponent>, private snackBar: MatSnackBar){
    this.userInfo = {
      firstName: localStorage.getItem('usersFName'),
      lastName: localStorage.getItem('usersLName'),
      email: localStorage.getItem('usersEmail')
    }
  }
}
