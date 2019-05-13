import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderNavComponent} from './header-nav/header-nav.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderNavComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [HeaderNavComponent]
})
export class SharedModule { }
