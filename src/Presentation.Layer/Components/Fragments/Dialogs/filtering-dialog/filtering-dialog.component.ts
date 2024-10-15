import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDialogComponent } from '../../../../../Domain.Layer/Intefaces/IDialogComponent';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'filtering-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './filtering-dialog.component.html',
  styleUrl: './filtering-dialog.component.css'
})
export class FilteringDialogComponent implements IDialogComponent {

  visible: boolean = false;
  style: object = {};
  label: string = '';

  @Input({ required: true }) Visible!: boolean;
  @Input({ required: true }) Label!: string;
  @Input() Style = this.style;
  
  @Output() OnClose = new EventEmitter();
  @Output() OnApprove = new EventEmitter();

  
}
