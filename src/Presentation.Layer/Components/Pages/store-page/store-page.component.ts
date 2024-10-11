import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StorepageheaderComponent } from "../../Fragments/storepageheader/storepageheader.component";
import { StorepagefooterComponent } from "../../Fragments/storepagefooter/storepagefooter.component";
import { StorepageMainComponent } from "../../Fragments/storepage-main/storepage-main.component";
import { BehaviorSubject } from 'rxjs';
import { ProductRepositoryService } from '../../../../Infrastructure.Layer/Repositories/Products/product-repository.service';
import { FilterParameters } from '../../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { PaginationService } from '../../../../Application.Layer/Services/pagination.service';
import { SortingParameters } from '../../../../Domain.Layer/Shared/Models/SortingParameters.model';
import { ProductCategory } from '../../../../Domain.Layer/Shared/Models/ProductCategory.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [StorepageheaderComponent, StorepagefooterComponent, StorepageMainComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.$innerWidth.next(window.innerWidth);
  }

  private selectedFilters: FilterParameters[] = [];
  private selectedSorting: SortingParameters | undefined = undefined;
  private searchValue: string | undefined = undefined;
  private selectedCategory: ProductCategory | undefined = undefined;

  constructor(private productRepository: ProductRepositoryService, private pagination: PaginationService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnDestroy(): void {
    this.pagination.pagination$.unsubscribe();
  }
  ngOnInit(): void {
  
    this.pagination.pagination$.subscribe((newValue) => {
      this.router.navigate([], {
        relativeTo: this.route,   // Keep the current route
        queryParams: { page: this.pagination.CurrentPage2() },  // Update the query parameters
        queryParamsHandling: 'merge',  // Merge with existing query parameters
      });

    });

    // this.productRepository.GetProductsBySearchString("", newValue, filter, sort).subscribe((x) => {
    //   this.pagination.setNewTotalAmount(x.total);
      
    // });
    // this.productRepository.GetProductsByCategory("smartphones", undefined, filter, sort).subscribe((x) => {
    //   this.pagination.setNewTotalAmount(x.total);
    // });
  }

  filterChanged(newFilters: FilterParameters[])
  {
    this.selectedFilters = newFilters;

    const result = newFilters == null ? null : JSON.stringify(newFilters);

    this.router.navigate([], {
      relativeTo: this.route,   // Keep the current route
      queryParams: { filters: result },  // Update the query parameters
      queryParamsHandling: 'merge',  // Merge with existing query parameters
    });

  }

  productChanged(product: ProductCategory)
  {
    this.selectedCategory = product;
    console.log(this.selectedCategory);
    const result = product != undefined ? product.name : null;
    this.router.navigate([], {
      relativeTo: this.route,   // Keep the current route
      queryParams: { product: result },  // Update the query parameters
      queryParamsHandling: 'merge',  // Merge with existing query parameters
    });
  }

  refreshPressed(): void
  {
    this.selectedFilters = [];
    this.selectedSorting = undefined;
    this.selectedCategory = undefined;
    this.searchValue = undefined;

    this.router.navigate([], { relativeTo: this.route });
  }

  searchChanged(search: string)
  {
    this.searchValue = search;

    const result = search == '' ? null : search;
    this.router.navigate([], {
      relativeTo: this.route,   // Keep the current route
      queryParams: { search: result },  // Update the query parameters
      queryParamsHandling: 'merge',  // Merge with existing query parameters
    });
  }

  sortingChanged(sorting: SortingParameters)
  {
    this.selectedSorting = sorting;

    const result = sorting == undefined ? null : JSON.stringify(sorting);
    this.router.navigate([], {
      relativeTo: this.route,   // Keep the current route
      queryParams: { sorting: result },  // Update the query parameters
      queryParamsHandling: 'merge',  // Merge with existing query parameters
    });
  }

  $innerWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
  
}
