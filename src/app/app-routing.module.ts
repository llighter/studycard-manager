import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./guards/auth.guard";
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
  , { path: 'login', component: LoginComponent }
  , { path: '', pathMatch: 'full', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
