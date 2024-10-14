import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StorepageheaderComponent } from "../../Fragments/storepageheader/storepageheader.component";
import { StorepagefooterComponent } from "../../Fragments/storepagefooter/storepagefooter.component";
import { StorepageMainComponent } from "../../Fragments/storepage-main/storepage-main.component";
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { ProductRepositoryService } from '../../../../Infrastructure.Layer/Repositories/Products/product-repository.service';
import { FilterParameters } from '../../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { PaginationService } from '../../../../Application.Layer/Services/pagination.service';
import { SortingParameters } from '../../../../Domain.Layer/Shared/Models/SortingParameters.model';
import { ProductCategory } from '../../../../Domain.Layer/Shared/Models/ProductCategory.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../Domain.Layer/Entities/Product.model';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [StorepageheaderComponent, StorepagefooterComponent, StorepageMainComponent, CommonModule],
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

  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private productRepository: ProductRepositoryService, private pagination: PaginationService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnDestroy(): void {
    this.pagination.pagination$.unsubscribe();
  }
  ngOnInit(): void {
  
    this.route.queryParams.pipe(
      tap((x) => {
        const filters = x['filters'];
        const sorting = x['sorting'];
        const search = x['search'];
        const category = x['product'];

        if(filters)
        {
          try
          {
            const paramFiltering = JSON.parse(filters) as FilterParameters[];
            this.selectedFilters = paramFiltering;
          }
          catch(error)
          {
            console.error(error);
          }
          
        }
      }),
      take(1)).subscribe();

    this.pagination.pagination$.subscribe((paging) => {
      this.router.navigate([], {
        relativeTo: this.route,   // Keep the current route
        queryParams: { page: this.pagination.CurrentPage() },  // Update the query parameters
        queryParamsHandling: 'merge',  // Merge with existing query parameters
      });

      this.productRepository.GetAllProducts(paging, this.selectedFilters, this.selectedSorting).subscribe((x) => {
        this.pagination.setNewTotalAmount(x.total);
        this.products$.next(x.products);
      });

      // this.productRepository.GetProductsByCategory("smartphones", undefined, this.selectedFilters, this.selectedSorting).subscribe((x) => {
      //   this.pagination.setNewTotalAmount(x.total);
      //   this.products$.next(x.products);
      // });
      // this.productRepository.GetProductsBySearchString("phone", newValue, this.selectedFilters, this.selectedSorting).subscribe((x) => {
      //   this.pagination.setNewTotalAmount(x.total);
      //   this.products$.next(x.products);
      // });

    });


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

    this.pagination.RefreshPagination();
  }

  productChanged(product: ProductCategory)
  {
    this.selectedCategory = product;

    const result = product != undefined ? product.name : null;
    this.router.navigate([], {
      relativeTo: this.route,   // Keep the current route
      queryParams: { product: result },  // Update the query parameters
      queryParamsHandling: 'merge',  // Merge with existing query parameters
    });

    this.pagination.RefreshPagination();
  }

  refreshPressed(): void
  {
    this.selectedFilters = [];
    this.selectedSorting = undefined;
    this.selectedCategory = undefined;
    this.searchValue = undefined;

    this.router.navigate([], { relativeTo: this.route });
    this.pagination.RefreshPagination();


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

    this.pagination.RefreshPagination();

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

    this.pagination.RefreshPagination();
  }

  $innerWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
  
}
