import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';

import { HomeComponent } from "./components/home/home.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { ProductsComponent } from "./components/products/products.component";
import { QualityComponent } from "./components/quality/quality.component";
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "customers", component: CustomersComponent },
  { path: "products", component: ProductsComponent },  
  { path: "quality", component: QualityComponent },
  { path: "login", component: LoginComponent },
  { path: "**", component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
