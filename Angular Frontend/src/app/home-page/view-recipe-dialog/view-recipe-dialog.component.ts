import { Component, Inject, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent, ApexTooltip, ApexResponsive } from "ng-apexcharts"
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import { any } from 'cypress/types/bluebird';

@Component({
  selector: 'app-view-recipe-dialog',
  templateUrl: './view-recipe-dialog.component.html',
  styleUrls: ['./view-recipe-dialog.component.css']
})
export class ViewRecipeDialogComponent implements AfterViewInit{

  chartValues: ApexNonAxisChartSeries
  chartType: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  }
  chartLabels = ["Protein", "Fat", "Carbs"]
  chartTitle: ApexTitleSubtitle = {
    text: 'Calories From Each Macro',
  }
  chartOptions: {
    tooltip: ApexTooltip;
  } = {
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value + ' calories';
        },
      },
    },
  };
  dataLabels = {
    enabled: true,
    position: 'bottom'
  }

  deleteSpinner: boolean
  displayedColumns: string[] = ['name', 'amount', 'calories', 'protein', 'carbs', 'fat'];
  dataSource: any

  @ViewChild(MatSort) sort = new MatSort();
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  constructor(@Inject(MAT_DIALOG_DATA) public recipe : any, private dialogRef: MatDialogRef<ViewRecipeDialogComponent>, private snackBar: MatSnackBar, private httpClient: HttpClient, private _liveAnnouncer: LiveAnnouncer){

    this.chartValues = [
      Number(recipe.totalMacros.Protein * 4),
      Number(recipe.totalMacros.Fat * 9),
      Number(recipe.totalMacros.Carbs * 4)
    ]

    this.deleteSpinner = false
    this.dataSource = new MatTableDataSource(recipe.ingredients)
  }
 
  DeleteRecipe(){
    this.deleteSpinner = true

    this.httpClient
    .delete('http://localhost:8080/recipeDelete/' + this.recipe.id)
    .subscribe((response: any) => {
      
      //What to do if success -> close dialog
      console.log(response)
      this.deleteSpinner = false
      this.dialogRef.close("true")

      //snack bar
      this.snackBar.open("Recipe deleted successfully!", "Dismiss")
      
    }, (err) =>{

      //If error, stay on page and do nothing
      console.log(err)
      this.deleteSpinner = false

      //Snack bar
      this.snackBar.open("Recipe could NOT be deleted!", "Dismiss")
    })
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
