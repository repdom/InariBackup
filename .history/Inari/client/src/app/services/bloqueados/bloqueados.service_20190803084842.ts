import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BloqueadosService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormularioEvaluacions', http, cookieService.get('access_token'));
  }

  getFilteredPagination(cuestionar: boolean, desde: number, tamPagina: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });

    // tslint:disable-next-line:max-line-length 60
    return this.http.get(this.url + `?filter=%7B%22limit%22%3A%20${tamPagina}%2C%20%22fields%22%3A%20%7B%22codigo%22%3A%20true%2C%22fechaCreacion%22%3A%20true%2C%20%22fechaGuardado%22%3Atrue%2C%20%22usuarioRelacionado%22%3Atrue%2C%20%22formularioModeloCodigo%22%3A%20true%2C%20%22areaCodigo%22%3A%20true%2C%20%22completado%22%3A%20true%2C%20%22bloqueado%22%3A%20true%7D%2C%20%22where%22%3A%7B%22bloqueado%22%3A%20%22${cuestionar}%22%7D%7D`, options)
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

  actualizarItemsEspecialesEnlazados(codigoFormularioEvaluacion: number, codigoItemEspecial: number, actualizador) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });

    // tslint:disable-next-line:max-line-length
    return this.http.put(this.url + `/${codigoFormularioEvaluacion}/itemEspeciales/${codigoItemEspecial}`, JSON.stringify(actualizador), options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }

  cantidadItemsIportantes(codigoFormulario: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + `/${codigoFormulario}/itemEspeciales/count?where=%7B%22importante%22%3Atrue%7D`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }

  cargarHistorial(codigoFormulario: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + `/${codigoFormulario}/historial/count?where=%7B%22importante%22%3Atrue%7D`, options)
    .pipe(
      map(response => response.json()),
      catchError(this.handlerError)
    );
  }
}
