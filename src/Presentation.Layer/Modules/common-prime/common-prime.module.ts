import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Toast, ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    ToastModule

  ],
  exports: [
    InputTextModule,
    ToastModule
  ]
})
export class CommonPrimeModule { }
