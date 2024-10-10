import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginationParameters } from '../../Domain.Layer/Shared/Models/PaginationParameters.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private skip: number = 0;
  private total: number = 50;
  private limit: number = 30;

  public CurrentPage = () => this.skip + 1;

  pagination$ = new BehaviorSubject<PaginationParameters>({ skip: this.skip, limit: this.limit });
  total$ = new BehaviorSubject(this.total);

  constructor() 
  { 


  }

  getPaginationParameters(): PaginationParameters
  {
    return { skip: this.skip, limit: this.limit } as PaginationParameters;
  }

  updatePaginationLimit(newLimit: number): void
  {
    if(newLimit !== this.limit) { this.limit = newLimit; }
    if(newLimit >= this.total) { this.pagination$.next({ skip: 0, limit: this.limit }); return; }
    this.pagination$.next({ skip: this.skip, limit: this.limit });
  }
  updatePaginationParameters(skip: number, limit: number): void
  {

    if(skip < 0) { throw new Error("Skip parameter cant be lower smaller 0"); }
    if(limit > 50 || limit <= 0) { throw new Error("Limited data amount must be between 1 and 50");  }

    if(skip !== this.skip) { this.skip = skip; }
    if(limit !== this.limit) { this.limit = skip; }

    this.pagination$.next({ skip: this.skip, limit: this.limit })

  }

  setNewTotalAmount(total: number)
  {
    if(total < 0) { throw new Error("Total number cant be smaller then 0") }
    this.total$.next(total);
  }

}
