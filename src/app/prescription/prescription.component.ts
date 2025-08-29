import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    document.body.className = "bg_background_addPrescription";
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
