// import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { BadInput } from '../app/comunes/bad-input';
import { AppError } from '../app/comunes/app-error';
import { catchError, map } from 'rxjs/operators';
import { Http, RequestMethod, Request, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';
import { NotFoundError } from '../app/comunes/not-found-error';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

// import { CookieService } from '../../../node_modules/ngx-cookie-service';

@Injectable()
export class DataService {
  // 'Authorization', `${this.cookieService.get('access_token')}`
  constructor(public url: string, protected http: Http, protected cookieService: string) {
    // this.cookieService = new CookieService(this);
    // const t = this.cookieService;
    // console.log(this.cookieService);
  }
  getAll() {
    // tslint:disable-next-line:max-line-length
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  getFromCode(codigo: number) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/' + codigo, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  create(resourse) {
    console.log(resourse);
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.url, JSON.stringify(resourse), options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  update(resourse) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    console.log(resourse);
    return this.http.patch(this.url + '/' + resourse.codigo, JSON.stringify(resourse), options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  count() {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/' + 'count', options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  publicdelete(item) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + '/' + item.codigo, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }
  public getRelation(codigo: number, urlAgregada: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/' + codigo + '/' + urlAgregada, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }
  public handlerError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }
    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }
  URL() {
    return this.url;
  }
  HTTP() {
    return this.http;
  }
}
