import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpiredComponent } from './expired/expired.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { PrivacyComponent } from './privacy/privacy.component';
import { AggiornaPrenotazioneComponent } from './aggiorna-prenotazione/aggiorna-prenotazione.component';
import { MiePrenotazioniComponent } from './mie-prenotazioni/mie-prenotazioni.component';

const routes: Routes = [

  { path: 'expired', component: ExpiredComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path : '', component : HomeComponent, canActivate: [AuthGuard] },
  { path : 'privacy', component : PrivacyComponent, canActivate: [AuthGuard] },
  { path : 'mie_prenotazioni', component : MiePrenotazioniComponent, canActivate: [AuthGuard] },
  { path : 'aggiorna_prenotazione', component : AggiornaPrenotazioneComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
