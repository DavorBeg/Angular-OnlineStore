import { Component, HostListener, OnInit } from '@angular/core';
import { StorepageheaderComponent } from "../../Fragments/storepageheader/storepageheader.component";
import { StorepagefooterComponent } from "../../Fragments/storepagefooter/storepagefooter.component";
import { StorepageMainComponent } from "../../Fragments/storepage-main/storepage-main.component";
import { BehaviorSubject } from 'rxjs';
import { ProductRepositoryService } from '../../../../Infrastructure.Layer/Repositories/Products/product-repository.service';
import { FilterParameters } from '../../../../Domain.Layer/Shared/Models/FilterParameters.model';
import { filters } from '../../../../Domain.Layer/Shared/Filtering/ImplementedFilters';
import { sorting } from '../../../../Domain.Layer/Shared/Sorting/ImplementedSorting';
import { sortBy } from '../../../../Domain.Layer/Shared/Enums/SortBy.enum';
import { PaginationService } from '../../../../Application.Layer/Services/pagination.service';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [StorepageheaderComponent, StorepagefooterComponent, StorepageMainComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.$innerWidth.next(window.innerWidth);
  }

  constructor(private productRepository: ProductRepositoryService, private pagination: PaginationService) {
   
    
  }
  ngOnInit(): void {
    
    let f = filters[0]
    f.valueFrom = '10';
    f.valueTo = '500';
    let filter = [f];
    let sort = sorting[0]
    sort.propertyName = 'title';
    sort.sortBy = sortBy.DESCENDING;


    this.pagination.pagination$.subscribe((newValue) => {
      console.log(newValue)
      this.productRepository.GetProductsBySearchString("", newValue, filter, sort).subscribe((x) => {
        this.pagination.setNewTotalAmount(x.total);
        console.log(x.total)
      });
    });


    // this.productRepository.GetProductsByCategory("smartphones", undefined, filter, sort).subscribe((x) => {
    //   x.products.forEach(element => {
        
    //   });
    // });


  }


  $innerWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
}
