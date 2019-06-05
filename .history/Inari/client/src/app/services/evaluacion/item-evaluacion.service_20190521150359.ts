import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ItemEvaluacionService extends DataService{

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/ItemEvaluacions', http, cookieService.get('access_token'));
  }

  /*getAllWhereCodigoItemEvaluacion(codigo: number, campo: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + `?filter={%22where%22:{%22${campo}%22:${codigo}}}`, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }*/

}
