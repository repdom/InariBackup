import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { DataService } from '../data.service';

@Injectable()
export class AreaService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/Areas', http, cookieService.get('access_token'));
  }
}
