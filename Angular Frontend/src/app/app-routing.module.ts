import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: '', title:'Foodie', component: LandingComponent},
  {path: 'login', title: 'Foodie - Login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', title: 'Foodie - Register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'home', title: 'Foodie - Home', component: HomeComponent, pathMatch: 'full'},
  {path: '**', title: 'Page Not Found', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
