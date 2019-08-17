import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/Calendarios', http, cookieService.get('access_token'));
  }
  public getProgramacionActiva() {
      const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
      headers.append('Authorization', this.cookieService);
      const options = new RequestOptions({ headers: headers });
      // tslint:disable-next-line:max-line-length
      return this.http.get(this.url + '/programacionActiva', options)
        .pipe(
          map(response => response.json()),
          catchError(this.handlerError)
        );
  }

  public borrarFormulario(codigoCalendario: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + '/' + item.codigo, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }
}
