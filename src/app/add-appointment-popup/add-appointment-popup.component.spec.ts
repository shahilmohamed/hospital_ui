import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentPopupComponent } from './add-appointment-popup.component';

describe('AddAppointmentPopupComponent', () => {
  let component: AddAppointmentPopupComponent;
  let fixture: ComponentFixture<AddAppointmentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppointmentPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppointmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
