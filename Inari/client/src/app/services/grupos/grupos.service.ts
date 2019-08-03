import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GruposService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/Grupos', http, cookieService.get('access_token'));
  }

}
