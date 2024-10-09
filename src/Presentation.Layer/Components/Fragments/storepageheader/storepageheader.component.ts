import { Component, Input, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ProductCategory } from '../../../../Domain.Layer/Shared/Models/ProductCategory.model';
import { ProductCategories } from '../../../../Domain.Layer/Shared/Enums/ProductCategories.enum';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SortingParameters } from '../../../../Domain.Layer/Shared/Models/SortingParameters.model';
import { sorting } from '../../../../Domain.Layer/Shared/Sorting/ImplementedSorting';
import { FilterParameters } from '../../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { filters } from '../../../../Domain.Layer/Shared/Filtering/ImplementedFilters';
import { MultiSelectModule } from 'primeng/multiselect';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'storepage-header',
  standalone: true,
  imports: [DropdownModule, IconFieldModule, InputIconModule, InputTextModule, MultiSelectModule, CommonModule, ButtonModule],
  templateUrl: './storepageheader.component.html',
  styleUrl: './storepageheader.component.css'
})
export class StorepageheaderComponent implements OnInit {

  @Input({ required: true }) windowWidth!: Observable<number>;

  products: ProductCategory[] = [];
  selectedProductCategory: string | undefined = undefined;

  sortBy: SortingParameters[] = sorting;
  selectedSorting: SortingParameters | undefined = undefined;

  filterBy: FilterParameters[] = filters;
  selectedFiltering: FilterParameters[] | undefined = undefined;

  search: string = '';

  constructor()
  {
      const tempCategories = Object.entries(ProductCategories);
      tempCategories.forEach(entry => {

        const [key, value] = entry;
        const sName = key.match(/[A-Z][a-z]+|[0-9]+/g);

        if(sName != null) {
          const fName = sName.join(" ");
          const itemToAdd = { slug: value, name: fName,  url: ""}
          if(!this.products.includes(itemToAdd)) { this.products.push(itemToAdd) }
        }

      });
  }
  ngOnInit(): void {

  }
}
