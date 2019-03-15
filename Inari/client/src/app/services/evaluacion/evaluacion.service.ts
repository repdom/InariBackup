import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormularioEvaluacions', http, cookieService.get('access_token'));
  }
}
