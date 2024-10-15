import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { StorepageheaderComponent } from "../../Fragments/storepageheader/storepageheader.component";
import { StorepagefooterComponent } from "../../Fragments/storepagefooter/storepagefooter.component";
import { StorepageMainComponent } from "../../Fragments/storepage-main/storepage-main.component";
import { BehaviorSubject, Observable, Subject, Subscription, take, tap } from 'rxjs';
import { ProductRepositoryService } from '../../../../Infrastructure.Layer/Repositories/Products/product-repository.service';
import { FilterParameters } from '../../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { PaginationService } from '../../../../Application.Layer/Services/pagination.service';
import { SortingParameters } from '../../../../Domain.Layer/Shared/Models/SortingParameters.model';
import { ProductCategory } from '../../../../Domain.Layer/Shared/Models/ProductCategory.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../Domain.Layer/Entities/Product.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PaginationParameters } from '../../../../Domain.Layer/Shared/Models/PaginationParameters.model';
import { toSignal } from '@angular/core/rxjs-interop';

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

  private pagination$: Subscription | undefined = undefined;

  products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private productRepository: ProductRepositoryService, public pagination: PaginationService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnDestroy(): void {
    this.pagination$?.unsubscribe();
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

    this.pagination$ = this.pagination.pagination$.subscribe((paging) => {
      if(this.searchValue && this.searchValue !== '')
      {
        this.productRepository.GetProductsBySearchString(this.searchValue, paging, this.selectedFilters, this.selectedSorting).subscribe((x) => {
          this.pagination.setNewTotalAmount(x.total);
          this.products$.next(x.products);
          this.pagination.isLoading = false;
        });
      }
      if(this.selectedCategory && (this.searchValue == '' || this.searchValue == undefined))
      {
        console.log(this.selectedCategory);
        this.productRepository.GetProductsByCategory(this.selectedCategory.slug, paging, this.selectedFilters, this.selectedSorting).subscribe((x) => {
          this.pagination.setNewTotalAmount(x.total);
          this.products$.next(x.products);
          this.pagination.isLoading = false;
        });
      }
      if((this.searchValue == undefined || this.searchValue === '') && (this.selectedCategory === undefined))
      {
        this.productRepository.GetAllProducts(paging, this.selectedFilters, this.selectedSorting).subscribe((x) => {
          this.pagination.setNewTotalAmount(x.total);
          this.products$.next(x.products);
          this.pagination.isLoading = false;
        });
      }

      this.router.navigate([], {
        relativeTo: this.route,   // Keep the current route
        queryParams: { page: this.pagination.CurrentPage() },  // Update the query parameters
        queryParamsHandling: 'merge',  // Merge with existing query parameters
      });

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
    product == null ? this.selectedCategory = undefined : this.selectedCategory = product;
    this.searchValue = undefined; // Because category changed, I must delte search value

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
    search == null || search === '' ? this.searchValue = undefined : this.searchValue = search;
    this.selectedCategory = undefined;

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
