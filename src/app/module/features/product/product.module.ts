import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ProductComponent} from './product.component';
import {ProductFormComponent} from "./product-form/product-form.component";


@NgModule({
  declarations: [ProductFormComponent, ProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    ScrollingModule,
    MultiSelectModule
  ]
})
export class ProductModule {
}
