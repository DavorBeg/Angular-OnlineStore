import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';
import { PaginationService } from '../../../../Application.Layer/Services/pagination.service';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'storepage-footer',
  standalone: true,
  imports: [PaginatorModule, ButtonModule, CommonModule],
  templateUrl: './storepagefooter.component.html',
  styleUrl: './storepagefooter.component.css'
})
export class StorepagefooterComponent {


  @Input({ required: true }) windowWidth!: Observable<number>;
  public selectedLimit: number = 30;

  constructor(public pagination: PaginationService)
  {
    const defaultParams = pagination.getPaginationParameters();
  }

  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 30, value: 30 },
    { label: 100, value: 100 }
  ];

  onPageChange(event: PaginatorState): void
  {
    this.pagination.updatePaginationParameters(event.first ?? 0, event.rows ?? 0)
  }
  pageOptionsChanged(event: DropdownChangeEvent): void
  {
    this.selectedLimit = event.value;
     this.pagination.updatePaginationLimit(this.selectedLimit);
  }
}
