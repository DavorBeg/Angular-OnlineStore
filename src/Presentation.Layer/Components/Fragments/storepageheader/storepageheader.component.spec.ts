import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorepageheaderComponent } from './storepageheader.component';

describe('StorepageheaderComponent', () => {
  let component: StorepageheaderComponent;
  let fixture: ComponentFixture<StorepageheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorepageheaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorepageheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
