import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MainLayoutComponent } from '../Components/Layouts/main-layout/main-layout.component';
import { AuthenticationService } from '../../Application.Layer/Authentication/authentication-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  constructor(private authService: AuthenticationService)
  {
    
  }
  ngOnInit(): void {
    this.authService.changeAuthenticationState();
  }
}
