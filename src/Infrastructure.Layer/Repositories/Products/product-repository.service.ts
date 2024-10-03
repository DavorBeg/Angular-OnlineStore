import { Injectable, OnInit } from '@angular/core';
import { Product } from '../../../Domain.Layer/Entities/Product.model';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { ProductRepository } from '../../../Domain.Layer/Contracts/ProductRepository.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductRepositoryService implements ProductRepository {

  
  constructor(private http: HttpClient) { }

  GetAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('products');
  }
  GetProductById(id: number): Observable<Product> {
    throw new Error('Method not implemented.');
  }
  GetProductsByCategories(categories: string[]): Observable<Product[]> {
    throw new Error('Method not implemented.');
  }
  GetProductsBySearchString(searchString: string): Observable<Product[]> {
    throw new Error('Method not implemented.');
  }


}
