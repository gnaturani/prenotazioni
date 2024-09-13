import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageService } from '../shared/page.service';

@Component({
  selector: 'app-mie-prenotazioni',
  templateUrl: './mie-prenotazioni.component.html',
  styleUrls: ['./mie-prenotazioni.component.css']
})
export class MiePrenotazioniComponent {

  public saveError: string = "";
  public saveMessage: string = ""
  public loading: boolean = false

  public utente: User = new User();

  constructor(
    public shared: SharedService,
    private _router: Router,
    private _http: HttpClient,
    public snackBar: MatSnackBar,
    public _pageService: PageService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.saveError = '';
    this.saveMessage = '';

    this.utente = this.shared.getUser();

    this._pageService.setPage('mie_prenotazioni');
  }

  GoToHome() {
    this._router.navigate(['home']);
  }

}
