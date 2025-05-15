import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medical-history',
  template: `<h3>Medical History for Patient ID: {{ patientId }}</h3>`,
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {

  patientId: number=0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
  }

}
