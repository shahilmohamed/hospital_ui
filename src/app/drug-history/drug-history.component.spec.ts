import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugHistoryComponent } from './drug-history.component';

describe('DrugHistoryComponent', () => {
  let component: DrugHistoryComponent;
  let fixture: ComponentFixture<DrugHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
