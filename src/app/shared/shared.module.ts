import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderNavComponent} from './header-nav/header-nav.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [HeaderNavComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxSpinnerModule
  ],
  exports: [HeaderNavComponent]
})
export class SharedModule { }
