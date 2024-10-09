import { Component, HostListener } from '@angular/core';
import { StorepageheaderComponent } from "../../Fragments/storepageheader/storepageheader.component";
import { StorepagefooterComponent } from "../../Fragments/storepagefooter/storepagefooter.component";
import { StorepageMainComponent } from "../../Fragments/storepage-main/storepage-main.component";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [StorepageheaderComponent, StorepagefooterComponent, StorepageMainComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.$innerWidth.next(window.innerWidth);
  }
  
  $innerWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);
}
