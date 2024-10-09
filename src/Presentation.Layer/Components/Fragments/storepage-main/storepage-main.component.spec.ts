import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorepageMainComponent } from './storepage-main.component';

describe('StorepageMainComponent', () => {
  let component: StorepageMainComponent;
  let fixture: ComponentFixture<StorepageMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorepageMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorepageMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
