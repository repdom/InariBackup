import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { DataService } from '../data.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AreaService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/Areas', http, cookieService.get('access_token'));
  }

  getFromCodeLimited(codigo: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.url + '/' + codigo + `?filter=%7B%22fields%22%3A%20%7B%22codigo%22%3A%20true%2C%20%22nombre%22%3A%20true%2C%20%22cancelado%22%3A%20true%2C%20%22usuarioAdministradorArea%22%3A%20true%7D%7D`, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  updateWithPureString(data, codigo) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    console.log(data);
    return this.http.patch(this.url + '/' + codigo, data, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  getFilterByAttributeOrderByName() {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.url + `?filter=%7B%22where%22%3A%20%7B%22cancelado%22%3A%200%7D%2C%20%22fields%22%3A%20%7B%22codigo%22%3A%20true%2C%20%22nombre%22%3A%20true%7D%2C%20%20%22order%22%3A%20%22nombre%20DESC%22%7D`, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

}
