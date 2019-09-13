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

  getFilteredPagination(pagina: number, desde: number, tamPagina: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.url + `?filter=%7B%22limit%22%3A%20${tamPagina}%2C%20%22skip%22%3A%20${desde}%2C%20%22fields%22%3A%20%7B%22codigo%22%3A%20true%2C%20%22fechaCreacion%22%3Atrue%2C%22fechaGuardado%22%3A%20true%2C%20%22usuarioRelacionado%22%3A%20true%2C%20%22formularioModeloCodigo%22%3A%20true%2C%20%22areaCodigo%22%3A%20true%7D%2C%20%20%22order%22%3A%20%22fechaGuardado%20DESC%22%7D`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }

  getFiltradoPaginacionConHallazgos(pagina: number, desde: number, tamPagina: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.url + `?filter={"limit": "${tamPagina}", "skip": "${desde}", "where": {"and":[{"or": [{"completado": true}, {"completado":null}]}, {"or": [{"liberado": true}, {"bloqueado": null}]}]}, "fields": {"codigo": true, "fechaCreacion": true, "fechaGuardado":true, "usuarioRelacionado": true, "formularioModeloCodigo": true, "areaCodigo": true, "bloqueado": true, "liberado": true, "hallazgos": true}, "order": "fechaGuardado DESC"}`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }

  getItemEspecialeEvaluacion(codigoFormularioEvaluacion: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + `/${codigoFormularioEvaluacion}/itemEspeciales`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }

  insertarConItemes(update) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + `/insertarConItemes`, JSON.stringify(update), options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }

  contar() {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.url + `/count?where={"and":[{"or": [{"completado": true}, {"completado":null}]}, {"or": [{"liberado": true}, {"bloqueado": null}]}]}`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }

  filtroDeEvaluaciones(desde: number, tamPagina: number, filtrosWhere: string, filtrosBetween: string) {
   // tslint:disable-next-line:max-line-length
   // {"limit": "10", "skip": "0", "where": {"fechaGuardado":{"between":["2019-07-2","2019-07-15"]},"and":[{"or": [{"completado": true}, {"completado":null}]}, {"or": [{"liberado": true}, {"bloqueado": null}]}]}, "fields": {"codigo": true, "fechaCreacion": true, "fechaGuardado":true, "usuarioRelacionado": true, "formularioModeloCodigo": true, "areaCodigo": true, "bloqueado": true, "liberado": true, "hallazgos": true}, "order": "fechaGuardado DESC"}
   const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
   headers.append('Authorization', this.cookieService);
   const options = new RequestOptions({ headers: headers });
   if (filtrosWhere === null) {
   // tslint:disable-next-line:max-line-length
   return this.http.get(this.url + `?filter={"limit": "${tamPagina}", "skip": "${desde}", "where": {"fechaGuardado":{"between":${filtrosBetween}},"and":[{"or": [{"completado": true}, {"completado":null}]}, {"or": [{"liberado": true}, {"bloqueado": null}]}]}, "fields": {"codigo": true, "fechaCreacion": true, "fechaGuardado":true, "usuarioRelacionado": true, "formularioModeloCodigo": true, "areaCodigo": true, "bloqueado": true, "liberado": true, "hallazgos": true}, "order": "fechaGuardado DESC"}`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
   } else if(filtrosBetween === null) {
   // tslint:disable-next-line:max-line-length
   return this.http.get(this.url + `?filter={"limit": "${tamPagina}", "skip": "${desde}", "where": {and":[{"or": [{"completado": true}, {"completado":null}]}, {"or": [{"liberado": true}, {"bloqueado": null}]}]}, "fields": {"codigo": true, "fechaCreacion": true, "fechaGuardado":true, "usuarioRelacionado": true, "formularioModeloCodigo": true, "areaCodigo": true, "bloqueado": true, "liberado": true, "hallazgos": true}, "order": "fechaGuardado DESC"}`, options)
    .pipe(
     map(response => response.json()),
     catchError(this.handlerError)
    );
   }
  }

  /*getCantidad() {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.url + `count`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }*/

  // {"and":[{"or": [{"completado": true}, {"completado":null}]}, {"or": [{"liberado": true}, {"bloqueado": null}]}]}
}
