import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home-page/home/home.component';
import { LandingComponent } from '../app/landing/landing.component'
import { PageNotFoundComponent } from '../app/page-not-found/page-not-found.component';
import { RegisterComponent } from '../app/register/register.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path: '', title:'Foodie', component: LandingComponent},
  {path: 'login', title: 'Foodie - Login', component: LoginComponent, pathMatch: 'full'},
  {path: 'register', title: 'Foodie - Register', component: RegisterComponent, pathMatch: 'full'},
  {path: 'home', title: 'Foodie - Home', component: HomeComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  {path: '**', title: 'Page Not Found', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
