import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemEspecialesService extends DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/FormularioEvaluacions', http, cookieService.get('access_token'));
  }

}
