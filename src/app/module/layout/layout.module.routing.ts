import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeLayoutComponent} from "./component/home-layout/home-layout.component";
import {HomeComponent} from "./component/home/home.component";
import {PurchasesComponent} from "./component/purchases/purchases.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";
import {ContactComponent} from "./component/contact/contact.component";
const routes: Routes = [
  {
    path: '', component: HomeLayoutComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'purchases', component: PurchasesComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'contact', component: ContactComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutModuleRouting { }
