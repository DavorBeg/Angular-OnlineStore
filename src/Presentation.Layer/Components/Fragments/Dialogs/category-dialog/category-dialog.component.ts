import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDialogComponent } from '../../../../../Domain.Layer/Intefaces/IDialogComponent';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'category-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.css'
})
export class CategoryDialogComponent implements IDialogComponent {

  visible: boolean = false;
  style: object = {};
  label: string = '';

  @Input({ required: true }) Visible = this.visible;
  @Input({ required: true }) Label = this.label;
  @Input() Style = this.style;
  
  @Output() OnClose = new EventEmitter();
  @Output() OnApprove: EventEmitter<any> = new EventEmitter();

  
}
