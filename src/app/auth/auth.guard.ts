import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { Returnapi } from '../shared/returnapi.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private route: ActivatedRoute,
    private _http: HttpClient,
    private _router: Router,
    private _shared: SharedService
  ) {

  }

  getQueryStringValue (key: any) {
    // tslint:disable-next-line:max-line-length
    // console.log(window.location);
    // console.log(window.location.href);
    // tslint:disable-next-line:max-line-length
    let token = decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));
    // console.log('first token found:', token);
    if (token === '' || token === null || token === undefined) {
        token = '';
        const searchToken = window.location.href.indexOf('token=');
        const findToken = window.location.href.substr(searchToken + 6);
        // console.log('findToken:', findToken);
        const tokens = findToken.split('?');
        // console.log('tokens:', tokens);
        // console.log('tokens length:', tokens.length);
        token = tokens[0];
    }
    if (token.substr(0, 2) === '//') {
      return null;
    }
    if (token.substr(0, 3) === '://') {
      return null;
    }
    return token;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // console.log('isLoggedIn', localStorage.getItem('isLoggedIn'));
      const token = this.getQueryStringValue('token');
      // console.log('tokenFrom Url:', token);
      if (token !== undefined && token !== '' && token !== null) {
          localStorage.setItem('isLoggedIn', 'true');
          this._shared.setToken(token);
      }
      // this._shared.setToken('');

      // console.log('token from Storage:', this._shared.getToken());

      let returnUrl = window.location.href;
      const splits = returnUrl.split('?');
      returnUrl = splits[0];
      localStorage.setItem('returnUrl', returnUrl);
      returnUrl = encodeURIComponent(returnUrl);

      if (localStorage.getItem('isLoggedIn') === 'true') {

        const that = this;
        const authenticated = this._http.post<Returnapi>( this._shared.getBasePath() + '/api/login/checkSession.php', {}
            );
        const subject = new Subject<boolean>();
        authenticated.subscribe(
            (val) => {
              // console.log('POST call successful value returned in body', val);
                // console.log(val);
                if (val.success) {
                  // console.log('utente autenticato!');
                  this._shared.setUserObj(val.returnObject);

                  let adminOk = false;
                  const user = JSON.parse(val.returnObject.toString());
                  user.apps.forEach(function(entryApp: any) {
                    // console.log('ID APP:', entryApp.id);
                    if (entryApp.id === '10') {
                      // console.log('utente autorizzato!');
                      adminOk = true;
                    }
                  });

                  if (!adminOk) {
                    console.log('utente NON autorizzato!');
                    window.location.href = this._shared.getHomePath();
                  } else {
                  }

                  if (this._shared.getUser().privacy_accepted !== true && state.url !== '/privacy') {
                    console.log('richiesta privacy!');
                    this._router.navigate(['privacy']);
                    subject.next(true);
                  } else {
                    subject.next(true);
                  }

                } else {
                  that._shared.setMessages(val.returnMessages);

                  try {
                    if ( val.returnMessages[0].indexOf('scadut') ) {

                    } else {
                      console.log(returnUrl);
                      window.location.href = this._shared.getLoginPath() + '?returnUrl=' + returnUrl;
                      return false;
                    }
                  } catch (Err) {

                  }

                  // that._router.navigate(['expired']);
                  window.location.href = this._shared.getLoginPath() + '?returnUrl=' + returnUrl;
                  return false;
                }
                return true;
            },
            response => {
              console.log('POST call in error', response);
              that._shared.setMessages(response);
              that._router.navigate(['expired']);
              return false;
            },
            () => {
              return;
            });
            return subject.asObservable();

      } else {
        window.location.href = this._shared.getLoginPath() + '?returnUrl=' + returnUrl;
        return false;
      }
  }


}
