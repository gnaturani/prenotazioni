import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MAT_ICON_DEFAULT_OPTIONS} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/token.interceptor';

import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ExpiredComponent } from './expired/expired.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PrivacyComponent } from './privacy/privacy.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MiePrenotazioniComponent } from './mie-prenotazioni/mie-prenotazioni.component';
import { AggiornaPrenotazioneComponent } from './aggiorna-prenotazione/aggiorna-prenotazione.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExpiredComponent,
    PrivacyComponent,
    MiePrenotazioniComponent,
    AggiornaPrenotazioneComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,

    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: MAT_ICON_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
