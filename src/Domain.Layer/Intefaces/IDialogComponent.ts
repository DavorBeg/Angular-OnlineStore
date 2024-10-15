import { EventEmitter } from "@angular/core";

export interface IDialogComponent
{
    visible: boolean;
    style: object;
    label: string;
    OnClose: EventEmitter<any>;
    OnApprove: EventEmitter<any>;
}