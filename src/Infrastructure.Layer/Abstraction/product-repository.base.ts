import { HttpClient, HttpParams } from "@angular/common/http";
import { PaginationParameters } from "../../Domain.Layer/Shared/Models/PaginationParameters.model";
import { FilterParameters } from "../../Domain.Layer/Shared/Models/FilterParameters.model";
import { SortingParameters } from "../../Domain.Layer/Shared/Models/SortingParameters.model";
import { map, Observable, of } from "rxjs";
import { Product } from "../../Domain.Layer/Entities/Product.model";
import { PaginationService } from "../../Application.Layer/Services/pagination.service";
import { ProductsDto } from "../../Domain.Layer/Shared/DTOs/Authentication/ProductsDto.model";
import { filters } from "../../Domain.Layer/Shared/Filtering/ImplementedFilters";

export abstract class ProductRepositoryBase 
{

    private lastFilters: FilterParameters[] | undefined = undefined;
    private lastTotal: number = 0;

    constructor(protected http: HttpClient) {

        
    }

    processQueryParams(search?: string, paging?: PaginationParameters, sorts?: SortingParameters, select?: string[]): HttpParams
    {
        let params = new HttpParams();
        if(search) { params = params.append('q', search) }
        if(paging) { params = params.append('limit', paging.limit).append('skip', paging.skip); }
        if(sorts) { params = params.append('sortBy', sorts.propertyName,).append('order', sorts.sortBy); }
        if(select) { params = params.append('select', select.join(",")) }
        return params;
    }

    applyFiltersToData<T>(items: T[], filters: FilterParameters[]): T[]
    {
        let result: T[] = [];

        filters.forEach(filter => {
            result = items.filter(p => {
                const property: any = p[`${filter.propertyName}` as keyof (typeof p)];
                if (typeof property === 'number') {
                    return property > Number(filter.valueFrom) && property < Number(filter.valueTo);
                }
                else { throw new Error("Filter type not implemented"); }

            })
        });     

        return result;
    }

    applySortingToData<T>(items: T[], sorting: SortingParameters): T[]
    {
        let result: T[] = [];

        result = items.sort((x, y) => {
            const xProperty: any = x[`${sorting.propertyName}` as keyof (typeof x)];
            const yProperty: any = y[`${sorting.propertyName}` as keyof (typeof y)];
            if (typeof xProperty === 'number' && typeof yProperty === 'number') {
                return sorting.sortBy === 'asc' ? xProperty - yProperty : yProperty - xProperty;
            }
            if(typeof xProperty === 'string' && typeof yProperty === 'string') {
                return sorting.sortBy === 'asc' ? xProperty.localeCompare(yProperty) : yProperty.localeCompare(xProperty);
            }
            return 0;

        });

        return result;
    }

    updateFilteredTotal(filterArgs: FilterParameters[], totalAmount: number, search?: string, category?: string): Observable<number>
    {
        if(search !== undefined && category !== undefined) throw new Error("Function does not accept search [arg] and category [arg] in same time.")
        if(this.FiltersAreEqual(this.lastFilters ?? [], filterArgs)) { return of(this.lastTotal) }
        let select: string[] = [];
        const paging: PaginationParameters = { skip: 0, limit: totalAmount } 
        filterArgs.forEach(filter => {
           select.push(filter.propertyName); 
        });

        this.lastFilters = filterArgs;
        const params = this.processQueryParams(search, paging, undefined, select);

        if(category)
        {
            return this.http.get<ProductsDto>(`products/category/${category}`, { params: params })
            .pipe(
                map((mappedValue) => 
                {
                    console.log("Values without filter: ", mappedValue.products.length);
                    mappedValue.products = this.applyFiltersToData(mappedValue.products, filterArgs);
                    console.log("Mapped value updated filters total:", mappedValue.products.length);
                    this.lastTotal = mappedValue.products.length
                    return this.lastTotal; 
                }))
        }
        else
        {
            return this.http.get<ProductsDto>(`products/search`, { params: params })
            .pipe(
                map((mappedValue) => 
                {
                    console.log("Values without filter: ", mappedValue.products.length);
                    mappedValue.products = this.applyFiltersToData(mappedValue.products, filterArgs);
                    console.log("Mapped value updated filters total:", mappedValue.products.length);
                    this.lastTotal = mappedValue.products.length
                    return this.lastTotal; 
                }))            
        }
        
    }


    private FiltersAreEqual(filters_a: FilterParameters[], filters_b: FilterParameters[]): boolean
    {
      const a = JSON.stringify(filters_a);
      const b = JSON.stringify(filters_b);
      return a === b ? true : false;
  
    }
}