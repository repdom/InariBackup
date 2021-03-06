import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { DataService } from '../data.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ItemService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/Items', http, cookieService.get('access_token'));
  }
}
