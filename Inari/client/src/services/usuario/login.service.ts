import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public login(empleado: Object): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(`${Config.host}/colaboradores/login`, empleado, {headers: headers});
  }

  public logout(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${this.cookieService.get('access_token')}`);
    return this.http.post(`${Config.host}/colaboradores/logout`, this.cookieService.get('access_token'), {headers: headers});
  }
}
