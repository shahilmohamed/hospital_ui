import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSelectDialogComponent } from './patient-select-dialog.component';

describe('PatientSelectDialogComponent', () => {
  let component: PatientSelectDialogComponent;
  let fixture: ComponentFixture<PatientSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientSelectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
