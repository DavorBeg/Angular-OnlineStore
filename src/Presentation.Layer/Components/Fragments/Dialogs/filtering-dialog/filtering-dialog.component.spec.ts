import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringDialogComponent } from './filtering-dialog.component';

describe('FilteringDialogComponent', () => {
  let component: FilteringDialogComponent;
  let fixture: ComponentFixture<FilteringDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteringDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteringDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
