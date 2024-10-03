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
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {


  items: MenuItem[] | undefined = undefined;
  user: string = "User";


  /**
   *
   */
  constructor(private productRepository: ProductRepositoryService) {

    
  }


  ngOnInit(): void {

    this.productRepository.GetAllProducts().subscribe();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home'
      },
      {
        label: 'Store',
        icon: 'pi pi-shopping-cart'
      },
      {
        label: 'My profile',
        icon: 'pi pi-user'
      },
      {
        label: 'Bookmark',
        icon: 'pi pi-bookmark'
      }
    ];
    
  }
}
