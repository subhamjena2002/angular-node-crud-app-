import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import {MatMenuModule} from '@angular/material/menu';
@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    CartComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule

  ]
})
export class ComponentsModule { }
