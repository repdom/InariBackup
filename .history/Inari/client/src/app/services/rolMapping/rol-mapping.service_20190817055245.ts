import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import { Config } from '../config';
import { DataService } from '../data.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolMappingService extends  DataService {

  constructor(http: Http, cookieService: CookieService) {
    super(Config.host + '/RoleMappings', http, cookieService.get('access_token'));
  }
  getAllWhereCodigoRol(codigo: number, campo: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '?filter={%22where%22:{%22principalId%22:' + String(codigo) + '}}', options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  updateRoleMapping(resourse) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    console.log(resourse);
    return this.http.patch(this.url + '/' + resourse.id, JSON.stringify(resourse), options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  getAllRelationRol() {
    
  }
}
