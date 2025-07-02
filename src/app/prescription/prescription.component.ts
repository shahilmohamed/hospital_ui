import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.body.className = "bg_background_addPrescription"
  }

  onSubmit(f:any){

  }

  ngOnDestroy(): void {
    document.body.className = ""
  }

}
