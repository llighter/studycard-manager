import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ModifyDialogComponent } from './modify-dialog/modify-dialog.component';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [ConfirmDialogComponent, ModifyDialogComponent],
  imports: [
    CommonModule
    , FormsModule
    , MatInputModule
    , MatButtonModule
    , MatDialogModule
    , MatFormFieldModule
  ],
  entryComponents: [
    ConfirmDialogComponent
    , ModifyDialogComponent
  ]
})
export class SharedModule { }
