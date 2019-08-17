import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/Historials', http, cookieService.get('access_token'));
  }
}
