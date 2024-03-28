import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
      { path: 'categorie', component: CategoriesComponent ,canActivate: [AuthGuard]},
      { path: 'about', component: AboutComponent ,canActivate: [AuthGuard]},
      { path: 'contact ', component: ContactUsComponent ,canActivate: [AuthGuard]},
      { path: 'cart', component: CartComponent ,canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
