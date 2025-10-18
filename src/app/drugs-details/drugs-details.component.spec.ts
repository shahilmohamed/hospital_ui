import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsDetailsComponent } from './drugs-details.component';

describe('DrugsDetailsComponent', () => {
  let component: DrugsDetailsComponent;
  let fixture: ComponentFixture<DrugsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrugsDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
