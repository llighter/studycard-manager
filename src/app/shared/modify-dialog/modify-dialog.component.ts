import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.scss']
})
export class ModifyDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
    , public dialogRef: MatDialogRef<ModifyDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
