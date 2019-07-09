import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

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

  // ?filter=%7B%22where%22%3A%20%7B%22formularioEvaluacionCodigo%22%3A%20163%7D%2C%20%22fields%22%3A%20%7B%22codigo%22%3A%20true%7D%7D
  deleteAllPorCodigoFormularioEvaluacion(codigoFormularioEvaluacion: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + `eliminarPorCodigoFormulario?formularioEvaluacionCodigo=${codigoFormularioEvaluacion}`, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

}
