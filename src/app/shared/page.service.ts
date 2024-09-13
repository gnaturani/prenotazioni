import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  ActPage: string = "";

  constructor(
    private _router: Router
  ) {

  }

  setPage(page: string) {
    this.ActPage = page;
  }

  getPage() {
    return this.ActPage;
  }


}
