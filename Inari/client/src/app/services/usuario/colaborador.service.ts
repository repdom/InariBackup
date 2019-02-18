import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/colaboradores', http, cookieService.get('access_token'));
  }

  updateUser(resourse) {
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
