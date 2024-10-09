import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorepagefooterComponent } from './storepagefooter.component';

describe('StorepagefooterComponent', () => {
  let component: StorepagefooterComponent;
  let fixture: ComponentFixture<StorepagefooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorepagefooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorepagefooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
