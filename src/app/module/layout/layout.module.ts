import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutModuleRouting} from "./layout.module.routing";
import {HomeLayoutComponent} from './component/home-layout/home-layout.component';
import {HeaderComponent} from "../../menu/header.component";
import {HomeComponent} from "./component/home/home.component";
import {PurchasesComponent} from "./component/purchases/purchases.component";
import {CheckoutComponent} from "./component/checkout/checkout.component";
import {ContactComponent} from "./component/contact/contact.component";


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HeaderComponent,
    HomeComponent,
    PurchasesComponent,
    CheckoutComponent,
    ContactComponent,
  ],
  imports: [
    LayoutModuleRouting,
    CommonModule,
  ]
})
export class LayoutModule { }
