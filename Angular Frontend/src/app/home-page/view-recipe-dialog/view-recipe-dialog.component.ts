import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle, ChartComponent } from "ng-apexcharts"


@Component({
  selector: 'app-view-recipe-dialog',
  templateUrl: './view-recipe-dialog.component.html',
  styleUrls: ['./view-recipe-dialog.component.css']
})
export class ViewRecipeDialogComponent {

  chartValues: ApexNonAxisChartSeries
  chartType: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  }
  chartLabels = ["Protein", "Fat", "Carbs"]
  chartTitle: ApexTitleSubtitle = {
    text: 'Calorie Distribution',
  }
 

  constructor(@Inject(MAT_DIALOG_DATA) public recipe : any){

    this.chartValues = [
      // recipe.totalMacros.protein * 4,
      // recipe.totalMacros.Fat * 9,
      // recipe.totalMacros.Carbs * 4

      5,5,5
    ]
  }

  DeleteRecipe(){
    
  }
}
