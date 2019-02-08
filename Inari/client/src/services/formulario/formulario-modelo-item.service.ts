import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { DataService } from '../data.service';

@Injectable()
export class FormularioModeloItemService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormularioModeloItems', http, cookieService.get('access_token'));
  }
}
