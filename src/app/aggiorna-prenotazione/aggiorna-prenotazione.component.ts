import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../shared/user.model';
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageService } from '../shared/page.service';
import { Returnapi } from '../shared/returnapi.model';
import { Room } from '../shared/room.model';
import { Slot } from '../shared/slot.model';
import { Prenotazione } from '../shared/prenotazione.model';
import { MatStepper } from '@angular/material/stepper';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-aggiorna-prenotazione',
  templateUrl: './aggiorna-prenotazione.component.html',
  styleUrls: ['./aggiorna-prenotazione.component.css']
})
export class AggiornaPrenotazioneComponent implements OnInit {

  public saveError: string = "";
  public saveMessage: string = ""
  public loading: boolean = false;
  public dataSelezionata?: Date = undefined;

  public prenotazione: Prenotazione = new Prenotazione();
  public slots: Slot[] = [];
  public quanti: number[] = [1,2,3,4,5];
  public stanze: Room[] = [];
  public utente: User = new User();
  public operazione: number = 0;
  public today = new Date();

  @ViewChild('stepper') private _stepper?: MatStepper;


  constructor(
    public shared: SharedService,
    private _router: Router,
    private _http: HttpClient,
    public snackBar: MatSnackBar,
    public _pageService: PageService,
    private route: ActivatedRoute,
    private _dateAdapter: DateAdapter<NativeDateAdapter>
  ) {
    _dateAdapter.setLocale('it-IT');
  }

  ngOnInit() {


    this.loading = false;
    this.saveError = '';
    this.saveMessage = '';

    this.utente = this.shared.getUser();

    this._pageService.setPage('aggiorna_prenotazione');

    this.operazione = Number.parseInt(this.route.snapshot.paramMap.get('operazione')!);

    console.log("operazione", this.operazione);

    this.prenotazione = new Prenotazione();
    this.prenotazione.data = new Date();

    this.RecuperaStanze();
    this.RecuperaSlot();

  }

  public onSelectedDate(event: any): void {
    this.prenotazione!.data = event;
    this.prenotazione!.data.setHours(10);
    console.log(this.prenotazione!.data);

    this.prenotazione.id_stanza = -1;
    this.resetSlots();
    this._stepper!.next();

    this.getRoomsForDate(this.prenotazione!.data);
  }

  public onSelectedSlot(slot: Slot): void {
    slot.attivo = !slot.attivo;
    this.prenotazione.id_slot = slot.id;
    this.prenotazione.id_stanza = -1;
  }

  public onSelectedStanza(stanza: Room): void {
    this.prenotazione!.id_stanza = stanza.id;
  }

  public onSelectedPersone(quante: number): void {
    this.prenotazione!.quante_persone = quante;
    this.prenotazione.id_stanza = -1;
  }

  public resetSlots(){
    this.slots.forEach(slot => slot.attivo = false);
  }

  public getRoomsForDate(inputData: Date) {

    const that = this;

    this._http.post<Returnapi>(this.shared.getBasePath() + '/api/prenotazioni/recuperaStanzePerData.php',
        {
          data: inputData
        }
      )
    .subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);

        try {
          if (val.success) {
            const stringi = JSON.stringify(val.returnObject);

            // this.stanze = JSON.parse(stringi);
            // this.stanze.forEach(stanza => {stanza.attiva = false;})
            // console.log(this.stanze);
          } else {
            that.saveError = val.returnMessages[0];
            this.snackBar.open(that.saveError, undefined, {
              duration: 2000,
            });
          }
        } catch (Err) {

        }
        that.loading = false;
      },
      response => {
        // console.log('POST call in error', response);
        try {
          that.saveError = response.error[0];
        } catch (Err) {
          that.saveError = 'Nessuna risposta dal server';
        }
        that.loading = false;
        this.snackBar.open(that.saveError, undefined, {
          duration: 2000,
        });
      },
      () => {
        console.log('The POST observable is now completed.');
        that.loading = false;
      });

  }

  public weekendDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  GoToHome() {
    this._router.navigate(['home']);
  }

  RecuperaStanze() {

    const that = this;

    this._http.get<Returnapi>(this.shared.getBasePath() + '/api/prenotazioni/recuperaStanze.php')
    .subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);

        try {
          if (val.success) {
            const stringi = JSON.stringify(val.returnObject);
            this.stanze = JSON.parse(stringi);
            this.stanze.forEach(stanza => {stanza.attiva = false;})
            console.log(this.stanze);
          } else {
            that.saveError = val.returnMessages[0];
            this.snackBar.open(that.saveError, undefined, {
              duration: 2000,
            });
          }
        } catch (Err) {

        }
        that.loading = false;
      },
      response => {
        // console.log('POST call in error', response);
        try {
          that.saveError = response.error[0];
        } catch (Err) {
          that.saveError = 'Nessuna risposta dal server';
        }
        that.loading = false;
        this.snackBar.open(that.saveError, undefined, {
          duration: 2000,
        });
      },
      () => {
        console.log('The POST observable is now completed.');
        that.loading = false;
      });

  }


  RecuperaSlot() {

    const that = this;

    this._http.get<Returnapi>(this.shared.getBasePath() + '/api/prenotazioni/recuperaSlot.php')
    .subscribe(
      (val) => {
        console.log('POST call successful value returned in body', val);

        try {
          if (val.success) {
            const stringi = JSON.stringify(val.returnObject);
            this.slots = JSON.parse(stringi);
            this.slots.forEach(slot => {slot.attivo = false;})
          } else {
            that.saveError = val.returnMessages[0];
            this.snackBar.open(that.saveError, undefined, {
              duration: 2000,
            });
          }
        } catch (Err) {

        }
        that.loading = false;
      },
      response => {
        // console.log('POST call in error', response);
        try {
          that.saveError = response.error[0];
        } catch (Err) {
          that.saveError = 'Nessuna risposta dal server';
        }
        that.loading = false;
        this.snackBar.open(that.saveError, undefined, {
          duration: 2000,
        });
      },
      () => {
        console.log('The POST observable is now completed.');
        that.loading = false;
      });

  }

}
