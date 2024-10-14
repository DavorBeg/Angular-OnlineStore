import { Component, Input } from '@angular/core';
import { Product } from '../../../../Domain.Layer/Entities/Product.model';
import { DataViewLayoutOptions, DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { LayoutModule } from '@angular/cdk/layout';

@Component({
  selector: 'storepage-main',
  standalone: true,
  imports: [DataViewModule, CommonModule, ButtonModule, TagModule],
  templateUrl: './storepage-main.component.html',
  styleUrl: './storepage-main.component.css'
})
export class StorepageMainComponent {

  layout: "list" | "grid" = 'grid';

  @Input({ required: true }) products: Product[] = [];

  

  getSeverity(product: Product) {
    if(product.stock > 10) return 'success';
    if(product.stock < 10 && product.stock > 0) return 'warning';
    else return 'danger';
  };

  getStockText(product: Product) {
    if(product.stock > 10) return 'IN STOCK';
    if(product.stock < 10 && product.stock > 0) return 'LOW STOCK';
    else return 'OUT OF STOCK';
 
  };

}
