import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationParameters } from '../../Domain.Layer/Shared/Models/PaginationParameters.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private skip: number = 0;
  private total: number = 50;
  private limit: number = 10;

  private default_limit = 10;
  private default_skip = 0;

  isLoading: boolean = true;

  public CurrentPage(): number
  {
      let result = 0;
      result = (this.skip / this.limit) + 1;
      return Math.floor(result);
    
  }

  pagination$ = new BehaviorSubject<PaginationParameters>({ skip: this.skip, limit: this.limit });
  // pagination$ = this.paginationSubject.asObservable();

  private totalSubject = new BehaviorSubject(this.total);
  total$ = this.totalSubject.asObservable();

  constructor() 
  { 

  }
  getPageLimit = () => this.limit;
  
  getPaginationParameters(): PaginationParameters
  {
    return { skip: this.skip, limit: this.limit } as PaginationParameters;
  }

  updatePaginationLimit(newLimit: number): void
  {
    if(newLimit !== this.limit) { this.limit = newLimit; }
    if(newLimit >= this.total) { this.pagination$.next({ skip: 0, limit: this.limit }); return; }
    this.isLoading = true;
    this.pagination$.next({ skip: this.skip, limit: this.limit });
  }

  updatePaginationParameters(skip: number, limit: number): void
  {

    if(limit > 500 || limit <= 0) { throw new Error("Limited data amount must be between 1 and 500");  }
    if(skip > -1)
    {
      if(skip !== this.skip) { if(limit >= this.total) { this.skip = 0; } else { this.skip = skip; } }
    }
    if(limit !== this.limit) 
    { 
      if(limit >= this.total) 
      {
        this.skip = 0;
      }
      this.limit = limit; 
    }

    this.pagination$.next({ skip: this.skip, limit: this.limit })

  }

  setNewTotalAmount(total: number)
  {
    if(total < 0) { throw new Error("Total number cant be smaller then 0") }
    this.total = total;
    this.totalSubject.next(total);
  }

  RefreshPagination(): void
  {
    this.pagination$.next({ skip: this.default_skip, limit: this.limit });
  }
  
}
