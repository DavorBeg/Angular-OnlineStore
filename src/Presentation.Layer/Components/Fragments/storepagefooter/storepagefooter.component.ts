import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Observable } from 'rxjs';

@Component({
  selector: 'storepage-footer',
  standalone: true,
  imports: [PaginatorModule, ButtonModule, CommonModule],
  templateUrl: './storepagefooter.component.html',
  styleUrl: './storepagefooter.component.css'
})
export class StorepagefooterComponent {

  @Input({ required: true }) windowWidth!: Observable<number>;

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 120;

  options = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 120, value: 120 }
];

  onPageChange(event: PaginatorState): void
  {

  }
}
