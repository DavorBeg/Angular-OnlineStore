import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDialogComponent } from '../../../../../Domain.Layer/Intefaces/IDialogComponent';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sorting-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule],
  templateUrl: './sorting-dialog.component.html',
  styleUrl: './sorting-dialog.component.css'
})
export class SortingDialogComponent implements IDialogComponent {

  visible: boolean = false;
  style: object = {};
  label: string = '';

  @Input({ required: true }) Visible = this.visible;
  @Input({ required: true }) Label = this.label;
  @Input() Style = this.style;
  
  @Output() OnClose = new EventEmitter();
  @Output() OnApprove = new EventEmitter();


}
