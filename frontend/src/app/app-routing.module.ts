import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './landingPage/login/login.component';
import { SignupComponent } from './landingPage/signup/signup.component';
import { PageNotFoundComponent } from './landingPage/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './landingPage/admin/admin.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [  
  {path:'login',component:LoginComponent },
  {path:'signup',component:SignupComponent },
  {path:'page_not_found',component:PageNotFoundComponent},
  {path:'admin',component:AdminComponent , canActivate: [AuthGuard]},
  {path:'home',loadChildren:()=>
    import('./components/components.module').then((m)=>m.ComponentsModule),canActivate: [AuthGuard]
  },
  {path:'',component: HomeComponent,canActivate: [AuthGuard]},
  {path:'**',component:HomeComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
