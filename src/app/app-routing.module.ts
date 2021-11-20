import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PurchasesComponent} from "./purchases/purchases.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'purchases', component: PurchasesComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
