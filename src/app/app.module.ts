import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import { SharedModule } from "./shared/shared.module";

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from "@angular/material/form-field";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardTableComponent } from './dashboard/dashboard-table/dashboard-table.component';
import { MilisecToDatePipe } from './pipes/milisec-to-date.pipe';
import { CardComponent } from './card/card.component';
import { CardFormComponent } from './card/card-form/card-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileFormComponent } from './profile/profile-form/profile-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardTableComponent,
    MilisecToDatePipe,
    CardComponent,
    CardFormComponent,
    ProfileComponent,
    ProfileFormComponent,
  ],
  imports: [
    BrowserModule
    , FormsModule
    , SharedModule
    , AppRoutingModule
    , ReactiveFormsModule
    , MatIconModule
    , MatListModule
    , MatInputModule
    , MatCardModule
    , MatDialogModule
    , MatButtonModule
    , MatSelectModule
    , MatToolbarModule
    , MatSidenavModule
    , MatFormFieldModule
    , BrowserAnimationsModule
    , AngularFireModule.initializeApp(environment.firebaseConfig)
    , AngularFireAuthModule
    , AngularFirestoreModule
    , ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }), MatTableModule, MatPaginatorModule, MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
