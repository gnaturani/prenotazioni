import { Component, OnInit } from '@angular/core';
import { User } from './shared/user.model';
import { SharedService } from './shared/shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageService } from './shared/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prenotazioni';

  public saveError: string = "";
  public saveMessage: string = ""
  public loading: boolean = false

  public utente: User = new User();

  constructor(
    public shared: SharedService,
    private _router: Router,
    private _http: HttpClient,
    public snackBar: MatSnackBar,
    public pageService: PageService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.saveError = '';
    this.saveMessage = '';

    this.utente = this.shared.getUser();
  }

  GoToUserHome() {
    window.location.href = this.shared.getHomePath() + '?token=' + this.shared.getToken();
  }

  GoToHome() {
    this._router.navigate(['home']);
  }

}
