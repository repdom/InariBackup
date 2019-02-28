import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreaFormularioService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormulariosAreas', http, cookieService.get('access_token'));
  }

  getAllWhereCodigoFormularioModelo(codigo: number, campo: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + `?filter={%22where%22:{%22${campo}%22:${codigo}}}`, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  updateWithID(resourse) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    console.log(resourse);
    return this.http.patch(this.url + '/' + resourse.id, JSON.stringify(resourse), options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

}
