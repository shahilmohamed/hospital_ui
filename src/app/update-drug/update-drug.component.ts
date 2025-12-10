import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../http.service';
import { Drug } from '../model/Drug';

@Component({
  selector: 'app-update-drug',
  templateUrl: './update-drug.component.html',
  styleUrls: ['./update-drug.component.css']
})
export class UpdateDrugComponent implements OnInit {

  constructor(
    private service: HttpService,
    private dialogRef: MatDialogRef<UpdateDrugComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Drug
  ) { }

  drugDetails: Drug ={
    id: this.data.id,
    name: this.data.name,
    mrp: this.data.mrp,
    perPieceRate: this.data.perPieceRate,
    quantity: this.data.quantity,
    addedDate: this.data.addedDate,
    updatedDate: this.data.updatedDate
  }

  actualDrugDetails: Drug ={
    id: this.data.id,
    name: this.data.name,
    mrp: this.data.mrp,
    perPieceRate: this.data.perPieceRate,
    quantity: this.data.quantity,
    addedDate: this.data.addedDate,
    updatedDate: this.data.updatedDate
  }

  async onSubmit(f:any){
    if(this.drugDetails.name != this.actualDrugDetails.name || this.drugDetails.mrp != this.actualDrugDetails.mrp || this.drugDetails.perPieceRate != this.actualDrugDetails.perPieceRate || this.drugDetails.quantity != this.actualDrugDetails.quantity){
      const response = await this.service.updateDrug(this.drugDetails).toPromise();
      if(response.message == 'Drug Updated Successfully!!!'){
        this.dialogRef.close(true);
      }else{
        this.dialogRef.close(false);
      }
    }else{
      console.log("inside else");
    }
    
  }

  ngOnInit(): void {
  }

}
