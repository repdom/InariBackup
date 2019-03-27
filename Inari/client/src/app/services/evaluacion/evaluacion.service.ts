import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormularioEvaluacions', http, cookieService.get('access_token'));
  }

  getAllWhereCodigoFormularioModelo(campo: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + `?filter={%22order%22:%22${campo} DESC%22}`, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  getFilterByModelAndOrderByDate() {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.url + `?filter=%7B%22fields%22%3A%20%7B%22codigo%22%3A%20true%2C%20%22fechaGuardado%22%3A%20true%2C%20%22usuarioRelacionado%22%3A%20true%2C%20%22formularioModeloCodigo%22%3A%20true%2C%20%22areaCodigo%22%3A%20true%2C%20%22fechaCreacion%22%3A%20true%7D%2C%20%20%22order%22%3A%20%22fechaGuardado%20DESC%22%7D`, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  getAllOrderDESC() {

  }
}