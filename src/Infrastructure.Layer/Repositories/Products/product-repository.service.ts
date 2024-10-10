import { Injectable, OnInit } from '@angular/core';
import { Product } from '../../../Domain.Layer/Entities/Product.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginationParameters } from '../../../Domain.Layer/Shared/Models/PaginationParameters.model';
import { FilterParameters } from '../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { SortingParameters } from '../../../Domain.Layer/Shared/Models/SortingParameters.model';
import { ProductRepositoryBase } from '../../Abstraction/product-repository.base';
import { map } from 'rxjs';
import { ProductsDto } from '../../../Domain.Layer/Shared/DTOs/Authentication/ProductsDto.model';
import { PaginationService } from '../../../Application.Layer/Services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService extends ProductRepositoryBase {

  
  constructor(http: HttpClient) { super(http); }

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
      map((productDto) => 
        {  
          if (filters) { productDto.products = super.applyFiltersToData(productDto.products, filters); }
          if(sorts) { productDto.products = super.applySortingToData(productDto.products, sorts) }

          productDto.total = productDto.products.length;
          return productDto;
        })
    );

  }
  GetProductsBySearchString(searchString: string, paging?: PaginationParameters, filters?: FilterParameters[], sorts?: SortingParameters): Observable<ProductsDto> {
    const params = super.processQueryParams(searchString, paging, sorts);
    return this.http.get<ProductsDto>(`products/search`, { params: params })
    .pipe(
      map((productDto) => 
        {  
          if (filters) { productDto.products = super.applyFiltersToData(productDto.products, filters); }
          if(sorts) { productDto.products = super.applySortingToData(productDto.products, sorts) }
          console.log("productDto.total:", productDto.total)
          return productDto;
        })
    );
  }

}
