import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from './../model/Appointment';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  medicineControl = new FormControl('');
  medicines: string[] = ['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Cetrizine', 'Metformin', 'Omeprazole'];
  filteredMedicines!: Observable<string[]>;
  selectedMedicines: string[] = [];
  prescriptionForm!: FormGroup;
  appointmentDetails: Appointment | null = null;

  constructor(private fb: FormBuilder, private service: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addPrescription";
    const appointmentId = this.route.snapshot.paramMap.get('id');
    this.prescriptionForm = this.fb.group({
      patientName: ['', Validators.required],
      medicines: this.fb.array([])
    });

    // Start with one empty medicine row
    this.addMedicine();
    this.filteredMedicines = this.medicineControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    this.fetchAppointmentDetails(appointmentId);
  }
  fetchAppointmentDetails(appointmentId: string | null) {
    if (appointmentId) {
      const appointment: Appointment = {
        firstname: '',
        lastname: '',
        contactNumber: '',
        diagnosis: '',
        diagnosisDate: null,
        isConsulted: false,
        id: Number(appointmentId)
      };
      this.service.getAppointmentById(appointment).subscribe(
        (response: Appointment) => {
          this.appointmentDetails = response;
          this.prescriptionForm.patchValue({
            patientName: `${response.firstname} ${response.lastname}`
          });
          console.log('Appointment Details:', response);
        },
        error => {
          console.error('Error fetching appointment details', error);
        }
      );
    }
  }

  onSubmit(f:any){

  }

  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.medicines.filter(med => med.toLowerCase().includes(filterValue));
  }

  get medicineArray(): FormArray {
    return this.prescriptionForm.get('medicines') as FormArray;
  }

  addMedicine(): void {
    const medicineGroup = this.fb.group({
      name: ['', Validators.required],
      dosage: ['', Validators.required],
      duration: ['', Validators.required]
    });
    this.medicineArray.push(medicineGroup);
  }

  removeMedicine(index: number): void {
    this.medicineArray.removeAt(index);
  }

  savePrescription(): void {
    if (this.prescriptionForm.valid) {
      console.log('Prescription Data:', this.prescriptionForm.value);
      alert('Prescription saved successfully!');
    } else {
      alert('Please fill all required fields.');
    }
  }

  ngOnDestroy(): void {
    document.body.className = ""
  }

}
