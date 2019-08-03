import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class BloqueadosServiceextends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormularioEvaluacions', http, cookieService.get('access_token'));
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
}
