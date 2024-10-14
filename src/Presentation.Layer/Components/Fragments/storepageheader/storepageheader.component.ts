import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ProductCategory } from '../../../../Domain.Layer/Shared/Models/ProductCategory.model';
import { ProductCategories } from '../../../../Domain.Layer/Shared/Enums/ProductCategories.enum';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SortingParameters } from '../../../../Domain.Layer/Shared/Models/SortingParameters.model';
import { sorting } from '../../../../Domain.Layer/Shared/Sorting/ImplementedSorting';
import { FilterParameters } from '../../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { filters } from '../../../../Domain.Layer/Shared/Filtering/ImplementedFilters';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { BehaviorSubject, debounceTime, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProductRepositoryService } from '../../../../Infrastructure.Layer/Repositories/Products/product-repository.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'storepage-header',
  standalone: true,
  imports: [DropdownModule, IconFieldModule, InputIconModule, InputTextModule, MultiSelectModule, CommonModule, ButtonModule, FormsModule],
  templateUrl: './storepageheader.component.html',
  styleUrl: './storepageheader.component.css'
})
export class StorepageheaderComponent implements OnInit, OnDestroy {

  @Input({ required: true }) windowWidth!: Observable<number>;

  products: ProductCategory[] = [];
  selectedProductCategory: ProductCategory | undefined = undefined;

  sortBy: SortingParameters[] = sorting;
  selectedSorting: SortingParameters | undefined = undefined;

  filterBy: FilterParameters[] = filters;
  selectedFiltering: FilterParameters[] | undefined = undefined;

  search: string = '';
  private searchUpdated$ = new BehaviorSubject('');

  @Output() onFilterChanged = new EventEmitter<FilterParameters[]>();
  @Output() onSortingChanged = new EventEmitter<SortingParameters>();
  @Output() onProductChanged = new EventEmitter<ProductCategory>();
  @Output() onSearchChanged = new EventEmitter<string>();
  @Output() onRefreshPressed = new EventEmitter();

  constructor(private productRepository: ProductRepositoryService)
  {
      // Every 1000ms after typing emit onSearchChanged event.
      this.searchUpdated$.pipe(debounceTime(1000)).subscribe((x) =>  { this.onSearchChanged.emit(x); console.log("search string ", x); })

      this.productRepository.GetProductCategories().subscribe(
          (value) => 
          { 
            this.products = [];
            value.forEach(element => {
              if(!this.products.includes(element)) { this.products.push(element) }
            });
          })

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
  ngOnDestroy(): void {
    this.searchUpdated$.unsubscribe();
  }
  ngOnInit(): void {

  }

  productChanged(event: DropdownChangeEvent): void
  {
    this.onProductChanged.emit(event.value);
  }

  filterChanged(event: MultiSelectChangeEvent)
  {
    this.onFilterChanged.emit(event.value);
  }

  filtersCleared()
  {
    this.onFilterChanged.emit(undefined);
  }

  sortingChanged(event: DropdownChangeEvent)
  {
    this.onSortingChanged.emit(event.value);
  }

  searchChanged()
  {
    this.searchUpdated$.next(this.search);
  }

  refreshPressed()
  {
    this.onRefreshPressed.emit();
  }
}
