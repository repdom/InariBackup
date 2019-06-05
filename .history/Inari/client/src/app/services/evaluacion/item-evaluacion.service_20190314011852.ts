import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Http } from '@angular/http';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ItemEvaluacionService extends DataService{

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/ItemEvaluacions', http, cookieService.get('access_token'));
  }
}
