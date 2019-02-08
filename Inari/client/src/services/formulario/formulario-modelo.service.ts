import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';

@Injectable()
export class FormularioModeloService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormularioModelos', http, cookieService.get('access_token'));
  }
}
