import { Observable } from "rxjs";
import { Product } from "../Entities/Product.model";

export interface ProductRepository
{
    GetAllProducts(): Observable<Product[]>;
    GetProductById(id: number): Observable<Product>;
    GetProductsByCategories(categories: string[]): Observable<Product[]>;
    GetProductsBySearchString(searchString: string): Observable<Product[]>;
}