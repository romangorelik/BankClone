import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CheckingComponent } from './checking/checking.component';
import { SavingsComponent } from './savings/savings.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'checking', component: CheckingComponent},
  {path: 'saving', component: SavingsComponent},
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: '**', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
