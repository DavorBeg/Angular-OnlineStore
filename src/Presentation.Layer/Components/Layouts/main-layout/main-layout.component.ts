import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { ProductRepositoryService } from '../../../../Infrastructure.Layer/Repositories/Products/product-repository.service';
import { AuthenticationService } from '../../../../Application.Layer/Authentication/authentication-service.service';
import { User } from '../../../../Domain.Layer/Entities/User.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, 
            RouterOutlet, 
            AvatarGroupModule, 
            MenubarModule, 
            AvatarModule, 
            BadgeModule, 
            InputTextModule,
            AvatarModule,
            ButtonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  providers: []
})
export class MainLayoutComponent implements OnInit {


  items: MenuItem[] | undefined = undefined;
  public user: User | undefined = undefined;


  /**
   *
   */
  constructor(private productRepository: ProductRepositoryService, public authService: AuthenticationService, private router: Router) {

    
  }


  ngOnInit(): void {

    if(this.authService.isAuthenticated()) {
      this.authService.getCurrentLoggedUser().subscribe((x) => this.user = x);
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => {
            this.router.navigate(['/homepage']);
            console.log("homepage");
          }
        
        },
        {
          label: 'Store',
          icon: 'pi pi-shopping-cart',
          command: () => {
            this.router.navigate(['/store']);
          }
        },
        {
          label: 'Bookmark',
          icon: 'pi pi-bookmark',
          command: () => {
            this.router.navigate(['/bookmark']);
          }
        },
        {
          label: 'My profile',
          icon: 'pi pi-user',
          command: () => {
            this.router.navigate(['/profile', this.user?.id]);
          }
          
        }];
    }
    else
    {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => {
            this.router.navigate(['homepage']);
          }
        },
        {
          label: 'Store',
          icon: 'pi pi-shopping-cart',
          command: () => {
            this.router.navigate(['store']);
          }
        }];
    }

    
  }
}
