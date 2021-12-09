import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChartModule} from "primeng/chart";
import {SaleComponent} from "./sale.component";
import {SaleRoutingModule} from "./sale-routing.module";



@NgModule({
  declarations: [SaleComponent],
  imports: [
    SaleRoutingModule,
    CommonModule,
    ChartModule
  ]
})
export class SaleModule { }
