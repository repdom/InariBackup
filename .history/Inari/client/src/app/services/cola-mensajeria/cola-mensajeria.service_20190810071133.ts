import { Injectable } from '@angular/core';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ColaMensajeriaService extends DataService {
  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/Calendarios', http, cookieService.get('access_token'));
  }
}
