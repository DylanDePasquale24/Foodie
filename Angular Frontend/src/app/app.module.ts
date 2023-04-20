//Other
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from '../shared/app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from 'ng-apexcharts';


// ANGULAR MATERIAL MODULES
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select'
import {MatTooltipModule } from '@angular/material/tooltip'
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';



// APP COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home-page/home/home.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginToolbarComponent } from './login-toolbar/login-toolbar.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { JwtInterceptor } from 'src/shared/services/jwt.interceptor';
import { AddRecipeDialogComponent } from './home-page/add-recipe-dialog/add-recipe-dialog.component';
import { ProfileDialogComponent } from './home-page/profile-dialog/profile-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewRecipeDialogComponent } from './home-page/view-recipe-dialog/view-recipe-dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingComponent,
    LoginComponent,
    ToolbarComponent,
    PageNotFoundComponent,
    LoginToolbarComponent,
    RegisterComponent,
    FooterComponent,
    AddRecipeDialogComponent,
    ProfileDialogComponent,
    ViewRecipeDialogComponent
  ],
  entryComponents: [AddRecipeDialogComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatSelectModule,
    MatTooltipModule,
    MatStepperModule,
    MatSnackBarModule,
    MatCardModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatTableModule,
    NgApexchartsModule,
    MatSortModule
  ],
  exports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
