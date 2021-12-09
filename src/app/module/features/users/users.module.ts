import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {UserFormComponent} from './user-form/user-form.component';
import {UsersComponent} from './users.component';


@NgModule({
  declarations: [UserFormComponent, UsersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    ScrollingModule,
    MultiSelectModule
  ]
})
export class UsersModule {
}
