import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  patientId: number = 0;
  name: string = "";
  selectedPrescription: any=null;

  history = [
    {
      diagnosisDate: '2024-12-01',
      diagnosis: 'Flu',
      revisitDate: '2024-12-10',
      review: 'Mild improvement',
      prescription: [
        { drug: 'Paracetamol', morning: true, afternoon: false, night: true, days: 5 },
        { drug: 'Antibiotic A', morning: true, afternoon: true, night: true, days: 7 }
      ]
    },
    {
      diagnosisDate: '2025-01-15',
      diagnosis: 'Cold and cough',
      revisitDate: '2025-01-25',
      review: 'Fully recovered',
      prescription: [
        { drug: 'Cough Syrup', morning: false, afternoon: true, night: true, days: 3 }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
  }

   openPrescription(prescription: any): void {
    this.selectedPrescription = prescription;
    const modal = document.getElementById('prescriptionModal');
    if (modal) new bootstrap.Modal(modal).show();
  }

  value = '';
  filteredHistory = [...this.history];

  onClickSearch(value: string): void {
    const query = value.trim().toLowerCase();

    this.filteredHistory = this.history.filter(patient => {
      return (
        patient.diagnosis.toLowerCase().includes(query) 
      );
    });
    if (!query) {
      this.filteredHistory = [...this.history];
      return;
    }

  }

}
