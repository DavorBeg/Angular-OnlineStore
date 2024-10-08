import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonPrimeModule } from '../../../Modules/common-prime/common-prime.module';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../../Application.Layer/Authentication/authentication-service.service';
import { UserForAuthenticationDto } from '../../../../Domain.Layer/Shared/DTOs/Authentication/UserForAuthenticateDto.model';
import { Router, RouterLink, NavigationExtras } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

 
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ButtonModule, CommonPrimeModule, CommonModule, ReactiveFormsModule],
  providers: [MessageService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  value: string = "";
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router, private msgService: MessageService) {
    this.loginForm = fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]

    });
  }

  login()
  {

    const values = this.loginForm.value;
    if(values.username && values.password)
    {
      this.authService.login({ username: this.loginForm.get('username')?.value, password: this.loginForm.get('password')?.value, expiresInMins: this.authService.EXPIRE_IN() })
      .subscribe(x => { 
        if(x) { this.router.navigate(['']); }
        else
        {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is wrong! Try again.' });
        }
       })
    }
    else
    {
      this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Email or password is wrong! Try again.' });
    }
  }
}
