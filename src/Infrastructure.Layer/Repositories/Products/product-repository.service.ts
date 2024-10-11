import { Injectable, OnInit } from '@angular/core';
import { Product } from '../../../Domain.Layer/Entities/Product.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationParameters } from '../../../Domain.Layer/Shared/Models/PaginationParameters.model';
import { FilterParameters } from '../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { SortingParameters } from '../../../Domain.Layer/Shared/Models/SortingParameters.model';
import { ProductRepositoryBase } from '../../Abstraction/product-repository.base';
import { filter, map, of, switchMap } from 'rxjs';
import { ProductsDto } from '../../../Domain.Layer/Shared/DTOs/Authentication/ProductsDto.model';
import { PaginationService } from '../../../Application.Layer/Services/pagination.service';
import { ProductCategory } from '../../../Domain.Layer/Shared/Models/ProductCategory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService extends ProductRepositoryBase {
  
  constructor(http: HttpClient) { super(http); }

  GetProductCategories(): Observable<ProductCategory[]>
  {
    return this.http.get<ProductCategory[]>('products/categories')
  }

  GetAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('products');
  }

  GetProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`products/${id}`);
  }

  public GetProductsByCategory(category: string, paging?: PaginationParameters, filters?: FilterParameters[], sorts?: SortingParameters): Observable<ProductsDto> {
    const params = super.processQueryParams(undefined, paging, sorts);
    return this.http.get<ProductsDto>(`products/category/${category}`, { params: params })
    .pipe(
      switchMap((value) => {
        if(filters)
        {

          value.products = super.applyFiltersToData(value.products, filters);
          return super.updateFilteredTotal(filters, value.total, undefined, category).pipe(map((fValue) => {
            value.total = fValue;
            return value;
          }))
        }
        else
        {
          return of(value);
        }

      })
    );

  }
  GetProductsBySearchString(searchString: string, paging?: PaginationParameters, filters?: FilterParameters[], sorts?: SortingParameters): Observable<ProductsDto> {
    const params = super.processQueryParams(searchString, paging, sorts);
    return this.http.get<ProductsDto>(`products/search`, { params: params })
    .pipe(
      switchMap((value) => {
        if(filters)
        {

          value.products = super.applyFiltersToData(value.products, filters);
          return super.updateFilteredTotal(filters, value.total, searchString, undefined).pipe(map((fValue) => {
            value.total = fValue;
            return value;
          }))
        }
        else
        {
          return of(value);
        }

      })
    );
  }



}
