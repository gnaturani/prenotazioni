import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageService } from '../shared/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    this._pageService.setPage('home');
  }

  GoToUserHome() {
    window.location.href = this.shared.getHomePath() + '?token=' + this.shared.getToken();
  }

  GoToNuovaPrenotazione() {
    this._router.navigate(['aggiorna_prenotazione', {operazione: "1"}]);
  }

  GoToMiePrenotazioni() {
    this._pageService.setPage('mie_prenotazioni');
    this._router.navigate(['mie_prenotazioni']);
  }

}
