import { Component, NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputOtpModule } from 'primeng/inputotp';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonGroupModule } from 'primeng/buttongroup';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CheckboxModule, ButtonModule, CardModule, InputOtpModule, FloatLabelModule, FormsModule, InputTextModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  value: string = "";

  constructor() {
  
    
  }

}
