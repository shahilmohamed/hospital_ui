import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugBillingComponent } from './drug-billing.component';

describe('DrugBillingComponent', () => {
  let component: DrugBillingComponent;
  let fixture: ComponentFixture<DrugBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrugBillingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
